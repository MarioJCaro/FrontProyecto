import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-venta-bebida-modal',
  templateUrl: './venta-bebida-modal.component.html',
  styleUrls: ['./venta-bebida-modal.component.scss']
})
export class VentaBebidaModalComponent implements OnInit {

  displayedColumns: string[] = ['bebida', 'precio', 'cantidad'];
  dataSource!: MatTableDataSource<any>;

  bebidas: any[] = [
    { id: 1, nombre: 'Fernet',precio: 200},
    { id: 2, nombre: 'Whisky',precio: 300},
    { id: 3, nombre: 'Cerveza',precio: 250},
    // ... puedes agregar más items
  ];

  clientesPreferenciales: string[] = ['Juancito', 'Pedro', 'Maria', 'Ana'];
clienteSeleccionado!: string;


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.bebidas);
  }

}
