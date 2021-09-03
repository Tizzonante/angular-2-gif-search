import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { GifsSearchComponent } from './gifs-search/gifs-search.component';
import { ResultsComponent } from './results/results.component';
import { FormsModule } from '@angular/forms';
import { GifService } from './services/gif.service';

@NgModule({
  declarations: [GifsPageComponent, GifsSearchComponent, ResultsComponent],
  exports: [GifsPageComponent],
  imports: [CommonModule, FormsModule],
  //providers: [GifService], esta linea hiría solo si quieres que el servicio GifService
  //unicamente funcione dentro del modulo GifsModule. Actualmente funciona de forma global
  //y pude ser usado en toda la aplicacion gracias al decorador @Injectable de los servicio
  //con el atributo providedIn: 'root',
})
export class GifsModule {}
