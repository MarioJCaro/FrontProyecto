import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCocinaComponent } from './components/home-cocina/home-cocina.component';
import { HomeCajaComponent } from './components/home-caja/home-caja.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './components/login/login.component';
import { InventarioComponent } from './components/inventario/inventario.component';



const routes: Routes = [

  {
    path:'homecocina', component:HomeCocinaComponent
  },
  {path:'homecaja', component:HomeCajaComponent},
  {
    path:'homeadmin', component:HomeAdminComponent
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path:'inventario', component:InventarioComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
