import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { SearchResult, Datum } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private _esPrimeraVez: boolean = true;
  private historialKey = 'historialBuqueda';
  private lastResultsKey = 'results';
  private _textToSeach: string = '';
  private apiKey: string = 'V0X4u5qE8SmGa9X4hzBzUSZ2fNxVMq9d';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  private maxSize: number = 10;
  private _currentResults: Datum[] = [];

  private get fullUrl(): string {
    return `${this.baseUrl}/search`;
  }

  public get historial(): string[] {
    return [...this._historial];
  }

  public get currentResults(): Datum[] {
    return [...this._currentResults];
  }

  public get esPrimeraVez(): boolean {
    return this._esPrimeraVez;
  }

  constructor(private httpClient: HttpClient) {
    this._esPrimeraVez = true;

    /*****************************
     * Recupero los ultimos gifs *
     *****************************/
    this._currentResults =
      JSON.parse(localStorage.getItem(this.lastResultsKey)!) || [];

    /*************************************
     * Recupero el historial de busqueda *
     *************************************/
    let historialStorage: string | null = localStorage.getItem(
      this.historialKey
    );
    if (historialStorage) {
      this._historial = JSON.parse(historialStorage!);
    }

    //Esta es la forma corta de recuperar los datos del historial
    // this._historial =
    //   JSON.parse(localStorage.getItem(this.historialKey)!) || [];
  }

  public searchGifs(query: string) {
    let resultadoBusqueda: SearchResult;
    query = query.toLowerCase();
    if (query && query.trim() === '') {
      return;
    }

    this.makeRequest(query);
    if (!this.existsInHistorial(query)) {
      this._historial.unshift(query);
      if (this._historial.length > this.maxSize) {
        this._historial.length = this.maxSize;
      }
      localStorage.setItem(this.historialKey, JSON.stringify(this._historial));
    }

    /*this.saveCurrentResults(resultadoBusqueda);
    console.log(resultadoBusqueda);*/
    console.log(this._historial);
  }

  private makeRequest(text: string) {
    this._textToSeach = text;

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', this._textToSeach)
      .set('limit', 10);

    this.httpClient
      .get<SearchResult>(this.fullUrl, { params })
      //.get<SearchResult>(this.fullUrl, { params: params }) //asi tambien funcionaria pero seria redundante poner dos veces la palabra params
      .subscribe((response) => {
        this._esPrimeraVez = false;
        if (response && response.data && response.data.length > 0) {
          this.saveCurrentResults(response.data);
        } else {
          this._currentResults.length = 0;
          this.saveResultsLocalStorage();
        }
      });
  }

  saveCurrentResults(arrayImages: Datum[]) {
    this._currentResults.length = 0;
    this._currentResults = arrayImages;
    this.saveResultsLocalStorage();
  }
  private saveResultsLocalStorage() {
    localStorage.setItem(
      this.lastResultsKey,
      JSON.stringify(this._currentResults)
    );
  }

  //downsized_large // rapidas preview_gif preview_webp
  //item.images.preview_webp.url

  /*saveCurrentResults(resultadoBusqueda: SearchResult) {
    this._currentResults.length = 0;
    resultadoBusqueda.data.forEach(
      (item) => this._currentResults.push(item.images.preview_webp.url) //downsized_large // rapidas preview_gif preview_webp
    );
  }*/

  private existsInHistorial(texto: string): boolean {
    return this._historial.includes(texto);
    // return this._historial.some((x) => x === texto);//esta es otra forma de preguntar si ya existe el texto en el historial
  }
  /**********************
   * Usando Axios *******
   **********************/
  public async searchGifsAxios(query: string) {
    let task;
    let resultadoBusqueda: SearchResult;
    query = query.toLowerCase();
    if (query && query.trim() === '') {
      return;
    }
    try {
      task = this.makeRequestAxios(query);
      if (!this.existsInHistorial(query)) {
        this._historial.unshift(query);
        if (this._historial.length > this.maxSize) {
          this._historial.length = this.maxSize;
        }
      }
      resultadoBusqueda = await task;
      //this.saveCurrentResults(resultadoBusqueda);
      console.log(resultadoBusqueda);
      console.log(this._historial);
    } catch (err) {
      console.log(err);
    }
  }

  private async makeRequestAxios(text: string): Promise<SearchResult> {
    this._textToSeach = text;
    const respuesta = await axios.get(this.fullUrl);
    return respuesta.data;
  }

  /**********************
   * Usando Fetch *******
   **********************/
  public searchGifsFetch(query: string) {
    query = query.toLowerCase();
    if (query && query.trim() !== '' && !this.existsInHistorial(query)) {
      this.makeRequestFetch(query);
      this._historial.unshift(query);
      if (this._historial.length > this.maxSize) {
        this._historial.length = this.maxSize;
        //si te interesa saber el texto que se eliminó del historial de busqueda puedes usar estas 2 lineas
        /*let textoEliminado: string = this._historial.pop() || '';
        console.log(`Texto eliminado del historial ${textoEliminado}`);*/
      }
    }
    console.log(this._historial);
  }

  private makeRequestFetch(text: string) {
    this._textToSeach = text;
    console.log(this.fullUrl);
    fetch(this.fullUrl).then((x) => x.json().then((data) => console.log(data)));
  }
}
