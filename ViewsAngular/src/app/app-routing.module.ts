import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCocinaComponent } from './components/home-cocina/home-cocina.component';
import { HomeCajaComponent } from './components/home-caja/home-caja.component';



const routes: Routes = [

  {
    path:'homecocina', component:HomeCocinaComponent
  },
  {path:'homecaja', component:HomeCajaComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
