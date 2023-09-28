import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCocinaComponent } from './components/home-cocina/home-cocina.component';
import { HomeCajaComponent } from './components/home-caja/home-caja.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './components/login/login.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { GestionEmpleadosComponent } from './components/gestion-empleados/gestion-empleados.component';
import { GestionClientesComponent } from './components/gestion-clientes/gestion-clientes.component';

//Cosas del back
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component'
import { MesasPrototypeComponent } from './components/mesas-prototype/mesas-prototype.component';



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
  },
  {
    path: 'gestionusers', component:GestionUsuariosComponent
  },
  {
    path: 'gestionempleados', component:GestionEmpleadosComponent
  },
  {
    path: 'gestionclientes', component:GestionClientesComponent
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  
  { path: 'mesas', component: MesasPrototypeComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
