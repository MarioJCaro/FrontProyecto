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
import { BackOfficeMenuComponent } from './components/back-office-menu/back-office-menu.component';
import { HomeMozoComponent } from './components/home-mozo/home-mozo.component';
import { MenuMozoComponent } from './components/menu-mozo/menu-mozo.component';
import { OrdenesMesaComponent } from './components/ordenes-mesa/ordenes-mesa.component';
import { HistorialVentasComponent } from './components/historial-ventas/historial-ventas.component';
import { AuthGuard } from './middlewares/auth.guard';
import { CategoriasComponent } from './components/categorias/categorias/categorias.component';
import { GruposComponent } from './components/grupos/grupos/grupos.component';



const routes: Routes = [

  {path:'homecocina', component:HomeCocinaComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Cocina'] }},
  {path:'homecaja', component:HomeCajaComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path:'homeadmin', component:HomeAdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'login', component:LoginComponent},
  {path:'inventario', component:InventarioComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'gestionusers', component:GestionUsuariosComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'gestionempleados', component:GestionEmpleadosComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'gestionclientes', component:GestionClientesComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'mesas', component: MesasPrototypeComponent, canActivate: [AuthGuard], data: { roles: ['Admin','Mozo'] }},
  {path:'backOfficeMenu', component:BackOfficeMenuComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path:'homemozo', component:HomeMozoComponent, canActivate: [AuthGuard], data: { roles: ['Admin','Mozo'] }},
  {path:'ordenesmesa', component:OrdenesMesaComponent, canActivate: [AuthGuard], data: { roles: ['Admin','Mozo'] }},
  {path:'menumozo', component:MenuMozoComponent, canActivate: [AuthGuard], data: { roles: ['Admin','Mozo'] }},
  {path:'historialVentas', component:HistorialVentasComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path:'categorias', component:CategoriasComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }},
  {path:'grupos', component:GruposComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
