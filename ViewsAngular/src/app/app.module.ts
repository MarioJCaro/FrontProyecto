import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './middlewares/auth.interceptor';
import { ErrorInterceptor } from './middlewares/error.interceptor';

import { MatCardModule } from '@angular/material/card'; // Importa el módulo de MatCard
import { MatButtonModule } from '@angular/material/button'; // Importa el módulo de MatButtonModule
import { MatIconModule } from '@angular/material/icon';  // Importa MatIconModule desde Angular Material
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';



import { HomeCocinaComponent } from './components/home-cocina/home-cocina.component';
import { CurrentTimeComponent } from './ExtraComponents/current-time/current-time.component';
import { FooterCajaComponent } from './ExtraComponents/footer-caja/footer-caja.component';
import { HeaderComponent } from './ExtraComponents/header/header.component';
import { HomeCajaComponent } from './components/home-caja/home-caja.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './components/login/login.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { AgregarItemModalComponent } from './ExtraComponents/agregar-item-modal/agregar-item-modal.component';
import { ModificarItemModalComponent } from './ExtraComponents/modificar-item-modal/modificar-item-modal.component';
import { EliminarItemModalComponent } from './ExtraComponents/eliminar-item-modal/eliminar-item-modal.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { GestionEmpleadosComponent } from './components/gestion-empleados/gestion-empleados.component';
import { GestionClientesComponent } from './components/gestion-clientes/gestion-clientes.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { MesasPrototypeComponent } from './components/mesas-prototype/mesas-prototype.component';
import { AgregarStockModalComponent } from './ExtraComponents/agregar-stock-modal/agregar-stock-modal.component';
import { QuitarStockModalComponent } from './ExtraComponents/quitar-stock-modal/quitar-stock-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCocinaComponent,
    CurrentTimeComponent,
    FooterCajaComponent,
    HeaderComponent,
    HomeCajaComponent,
    HomeAdminComponent,
    LoginComponent,
    InventarioComponent,
    AgregarItemModalComponent,
    ModificarItemModalComponent,
    EliminarItemModalComponent,
    GestionUsuariosComponent,
    GestionEmpleadosComponent,
    GestionClientesComponent,
    UnauthorizedComponent,
    MesasPrototypeComponent,
    AgregarStockModalComponent,
    QuitarStockModalComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
