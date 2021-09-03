import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
  imports: [CommonModule],
  providers: [],
})
export class SharedModule {}
