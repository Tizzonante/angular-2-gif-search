import { Injectable } from '@angular/core';
import axios from 'axios';
import { SearchResult } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private _textToSeach: string = '';
  private apiKey: string = 'V0X4u5qE8SmGa9X4hzBzUSZ2fNxVMq9d';
  private _historial: string[] = [];
  private maxSize: number = 5;
  private _currentResults: string[] = [];

  private get fullUrl(): string {
    return `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${this._textToSeach}&limit=10`;
  }

  public get historial(): string[] {
    return [...this._historial];
  }

  public get currentResults(): string[] {
    return [...this._currentResults];
  }

  public async searchGifs(query: string) {
    let task;
    let resultadoBusqueda: SearchResult;
    query = query.toLowerCase();
    if (query && query.trim() === '') {
      return;
    }
    try {
      task = this.makeRequest(query);
      if (!this.existsInHistorial(query)) {
        this._historial.unshift(query);
        if (this._historial.length > this.maxSize) {
          this._historial.length = this.maxSize;
        }
      }
      resultadoBusqueda = await task;
      this.saveCurrentResults(resultadoBusqueda);
      console.log(resultadoBusqueda);
      console.log(this._historial);
    } catch (err) {
      console.log(err);
    }
  }
  saveCurrentResults(resultadoBusqueda: SearchResult) {
    this._currentResults.length = 0;
    resultadoBusqueda.data.forEach(
      (item) => this._currentResults.push(item.images.preview_webp.url) //downsized_large // rapidas preview_gif preview_webp
    );
  }

  private async makeRequest(text: string): Promise<SearchResult> {
    this._textToSeach = text;
    const respuesta = await axios.get(this.fullUrl);
    return respuesta.data;
  }

  private existsInHistorial(texto: string): boolean {
    return this._historial.includes(texto);
    // return this._historial.some((x) => x === texto);//esta es otra forma de preguntar si ya existe el texto en el historial
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
