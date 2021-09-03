import { Component } from '@angular/core';
import { GifService } from '../services/gif.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [],
})
export class ResultsComponent {
  public get results(): string[] {
    return this.gifService.currentResults;
  }
  constructor(private gifService: GifService) {}
}
