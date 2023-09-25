import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarItemModalComponent } from 'src/app/ExtraComponents/agregar-item-modal/agregar-item-modal.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent  implements OnInit {

  displayedColumns: string[] = ['nombre', 'categoria', 'stock', 'costo', 'acciones'];
  dataSource!: MatTableDataSource<Item>;

   // Datos ficticios para el dataSource
   items: Item[] = [
    { id: 1, nombre: 'Producto A', categoria: 'Electrónicos', stock: 15, costo: 150.50 },
    { id: 2, nombre: 'Producto B', categoria: 'Hogar', stock: 40, costo: 75.20 },
    { id: 3, nombre: 'Producto C', categoria: 'Deportes', stock: 9, costo: 210.00 },
    // ... puedes agregar más items
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.items);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarItemModalComponent, {
      width: '400px',
      data: {}  // Puedes pasar la data inicial aquí si es necesario.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }
}
