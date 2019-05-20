import { HomechildrenModule } from './homechildren/homechildren.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      {path: '', loadChildren: './homechildren/homechildren.module#HomechildrenModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
