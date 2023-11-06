import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-seleccionar-item-menu',
  templateUrl: './seleccionar-item-menu.component.html',
  styleUrls: ['./seleccionar-item-menu.component.scss']
})
export class SeleccionarItemMenuComponent {
  cantidad: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  // Función para calcular el total
  getTotal(): number {
    return this.cantidad * this.data.precio;
  }

  // Funciones para incrementar y decrementar la cantidad
  incrementarCantidad() {
    this.cantidad++;
  }

  decrementarCantidad() {
    if (this.cantidad >= 1) { // Asumiendo que no puede haber cantidad menor a 1
      this.cantidad--;
    }
  }
}
