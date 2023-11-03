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
import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { GrupoMenuComponent } from './components/grupo-menu/grupo-menu.component';
import { ResumenOrdenMenuComponent } from './components/resumen-orden-menu/resumen-orden-menu.component';
import { HomeEstadisticasComponent } from './components/home-estadisticas/home-estadisticas.component';
import { EstadisticasGeneralesComponent } from './components/estadisticas-generales/estadisticas-generales.component';
import { EstadisticasClientesComponent } from './components/estadisticas-clientes/estadisticas-clientes.component';
import { EstadisticasVentasComponent } from './components/estadisticas-ventas/estadisticas-ventas.component';
import { EstadisticasBarraComponent } from './components/estadisticas-barra/estadisticas-barra.component';




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
  {
    path:'backOfficeMenu', component:BackOfficeMenuComponent
  },
  {path:'homemozo', component:HomeMozoComponent},
  {path:'ordenesmesa', component:OrdenesMesaComponent},
  {path:'menumozo', component:MenuMozoComponent},
  {path:'historialVentas', component:HistorialVentasComponent},
  {path:'homemenu', component:HomeMenuComponent},
  {path:'grupomenu', component:GrupoMenuComponent},
  {path: 'resumenordenmenu', component:ResumenOrdenMenuComponent},
  {path: 'estadisticas', component:HomeEstadisticasComponent},
  {path: 'estadisticasgenerales', component:EstadisticasGeneralesComponent},
  {path: 'estadisticasclientes', component:EstadisticasClientesComponent},
  {path: 'estadisticasventas', component:EstadisticasVentasComponent},
  {path: 'estadisticasbarra', component:EstadisticasBarraComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
