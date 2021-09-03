import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-gifs-search',
  templateUrl: './gifs-search.component.html',
  styles: [],
})
export class GifsSearchComponent {
  @ViewChild('textoABuscar') //este es el nombre que le pusiste en tu referencia local asociada al input  dentro del template html
  public inputElementRef!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifService) {}

  public buscar() {
    const valor = this.inputElementRef.nativeElement.value;
    this.gifService.searchGifs(valor);
    this.inputElementRef.nativeElement.value = ''; //limpiamos la caja de texto donde le usuario busca sus gifs
  }

  /////////////// ESTOS ULTIMOS 3 METODOS SOLO LOS AGREGUE PARA APRENDER
  public textSeach: string = '';
  public search(tBuscar: string) {
    this.textSeach = tBuscar;
    console.log(`Texto que buscará:${this.textSeach}`);

    console.log(this.inputElementRef.nativeElement.value);

    /*this.textSeach = '';//esto es para limpiar lo que tiene dentro el input donde el usuario escribe lo que va a buscar
    document.querySelector('input')!.value = this.textSeach;*/
  }

  public search2(evento: KeyboardEvent): void {
    //tSeach: string;
    console.log(evento);
    console.log(`Texto que buscará:${this.textSeach}`);
  }

  public search3(tBuscar: HTMLInputElement) {
    this.textSeach = tBuscar.value;
    console.log(`Texto que buscará:${this.textSeach}`);
  }
}
