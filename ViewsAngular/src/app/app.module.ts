import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

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


import { HomeCocinaComponent } from './components/home-cocina/home-cocina.component';
import { CurrentTimeComponent } from './ExtraComponents/current-time/current-time.component';
import { FooterCajaComponent } from './ExtraComponents/footer-caja/footer-caja.component';
import { HeaderComponent } from './ExtraComponents/header/header.component';
import { HomeCajaComponent } from './components/home-caja/home-caja.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { LoginComponent } from './components/login/login.component';
import { InventarioComponent } from './components/inventario/inventario.component';

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
    
  ],
  imports: [
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
