import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarItemModalComponent } from 'src/app/ExtraComponents/agregar-item-modal/agregar-item-modal.component';
import { ModificarItemModalComponent } from 'src/app/ExtraComponents/modificar-item-modal/modificar-item-modal.component';
import { EliminarItemModalComponent } from 'src/app/ExtraComponents/eliminar-item-modal/eliminar-item-modal.component';
import { AgregarStockModalComponent } from 'src/app/ExtraComponents/agregar-stock-modal/agregar-stock-modal.component';
import { QuitarStockModalComponent } from 'src/app/ExtraComponents/quitar-stock-modal/quitar-stock-modal.component';



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
    { id: 1, nombre: 'Producto A', descripcion:'Un item', categoria: 'Electrónicos', stock: 15, costo: 150.50 },
    { id: 2, nombre: 'Producto B', descripcion:'Un item', categoria: 'Hogar', stock: 40, costo: 75.20 },
    { id: 3, nombre: 'Producto C', descripcion:'Un item', categoria: 'Deportes', stock: 9, costo: 210.00 },
    // ... puedes agregar más items
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.items);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarItemModalComponent, {
      width: '30rem',
      data: {},  // Puedes pasar la data inicial aquí si es necesario.
      hasBackdrop: true,
      disableClose: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }

  openEditDialog(item: Item): void {
    const dialogRef = this.dialog.open(ModificarItemModalComponent, {
      width: '30rem',
      data: item  // Pasa el ítem a modificar como dato.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar los cambios.
    });
  }

  // En inventario.component.ts

openDeleteDialog(item: Item): void {
  
  const dialogRef = this.dialog.open(EliminarItemModalComponent, {
    width: '15rem',
    data: { item: item },  // Pasamos el ítem completo al modal
  }
  );

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aquí puedes eliminar el ítem
      // TODO: Añadir la lógica para eliminar el ítem
    }
  });
}

openAddStockDialog(item: Item): void {
  const dialogRef = this.dialog.open(AgregarStockModalComponent, {
    width: '25rem',
    data: { item: item }
  });
  
  dialogRef.afterClosed().subscribe(newStock => {
    if (newStock) {
      // Aquí puedes actualizar el stock del ítem
      item.stock = newStock;
    }
  });
}

openRemoveStockDialog(item: Item): void {
  const dialogRef = this.dialog.open(QuitarStockModalComponent, {
    width: '30rem',
    data: { item: item }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      // Actualizar el stock del ítem en base al valor devuelto por el modal
      // TODO: Implementa la lógica para actualizar el stock
      item.stock = result;
    }
  });
}




  
}
