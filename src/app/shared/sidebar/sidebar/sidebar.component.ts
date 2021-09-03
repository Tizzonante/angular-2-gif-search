import { Component } from '@angular/core';
import { GifService } from '../../../gifs/services/gif.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public get historical(): string[] {
    return this.gifService.historial;
  }

  constructor(private gifService: GifService) {}
}
