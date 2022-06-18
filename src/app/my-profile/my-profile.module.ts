import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update/update.component';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    UpdateComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule
  ]
})
export class MyProfileModule { }
