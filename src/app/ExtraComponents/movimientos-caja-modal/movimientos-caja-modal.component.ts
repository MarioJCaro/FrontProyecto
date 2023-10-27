import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movimiento } from 'src/app/models/movimiento.model';
import { Time } from "@angular/common";

@Component({
  selector: 'app-movimientos-caja-modal',
  templateUrl: './movimientos-caja-modal.component.html',
  styleUrls: ['./movimientos-caja-modal.component.scss']
})
export class MovimientosCajaModalComponent {

  displayedColumns: string[] = ['tipo', 'monto', 'observacion', 'nroOrden','fecha','hora'];
  dataSource!: MatTableDataSource<Movimiento>;

   // Datos ficticios para el dataSource
   movimientos: Movimiento[] = [
    { id: 1, tipo: 'Ingreso Efectivo', fecha:new Date(), hora: this.getCurrentTime() , observacion: 'HOLAAAA', total: 300, nroOrden:1},
    { id: 2, tipo: 'Ingreso Efectivo', fecha:new Date(), hora: this.getCurrentTime() , observacion: 'HOLAAAA', total: 300, nroOrden:0},
    { id: 3, tipo: 'Ingreso Efectivo', fecha:new Date(), hora: this.getCurrentTime() , observacion: 'HOLAAAA', total: 300, nroOrden:0},
    // ... puedes agregar más items
  ];

  ngOnInit(){
    this.dataSource = new MatTableDataSource(this.movimientos);
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
}
