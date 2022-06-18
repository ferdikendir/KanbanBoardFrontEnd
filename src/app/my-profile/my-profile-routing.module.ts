import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'my-profile',
    component: UpdateComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MyProfileRoutingModule { }
