import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastMessageComponent } from './toast-message.component';
import {ToastModule} from 'primeng/toast';



@NgModule({
  declarations: [
    ToastMessageComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ]
})
export class ToastrModule { }
