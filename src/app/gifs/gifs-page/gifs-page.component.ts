import { Component } from '@angular/core';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-gifs-page',
  templateUrl: './gifs-page.component.html',
  styles: [],
})
export class GifsPageComponent {
  public get primeraVez() {
    return this.gifService.esPrimeraVez;
  }
  public resultsEmpty(): boolean {
    const length = this.gifService.currentResults.length;
    return length === 0;
  }
  constructor(private gifService: GifService) {}
}
