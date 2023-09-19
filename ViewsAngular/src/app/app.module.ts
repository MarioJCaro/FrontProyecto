import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card'; // Importa el módulo de MatCard
import { MatButtonModule } from '@angular/material/button'; // Importa el módulo de MatButtonModule
import { MatIconModule } from '@angular/material/icon';  // Importa MatIconModule desde Angular Material
import {MatListModule} from '@angular/material/list';

import { HomeCocinaComponent } from './components/home-cocina/home-cocina.component';
import { CurrentTimeComponent } from './ExtraComponents/current-time/current-time.component';
import { FooterCajaComponent } from './ExtraComponents/footer-caja/footer-caja.component';
import { HeaderComponent } from './ExtraComponents/header/header.component';
import { HomeCajaComponent } from './components/home-caja/home-caja.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeCocinaComponent,
    CurrentTimeComponent,
    FooterCajaComponent,
    HeaderComponent,
    HomeCajaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule, 
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
