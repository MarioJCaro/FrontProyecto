import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Empleado } from 'src/app/models/empleado.model';

@Component({
  selector: 'app-gestion-empleados',
  templateUrl: './gestion-empleados.component.html',
  styleUrls: ['./gestion-empleados.component.scss']
})
export class GestionEmpleadosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'rol', 'contacto', 'acciones'];
  dataSource!: MatTableDataSource<Empleado>;

   // Datos ficticios para el dataSource
   empleados: Empleado[] = [
    { id: 1, nombre: 'Pepe', rol: 'Chef', contacto: '099123123'},
    { id: 2, nombre: 'Juan', rol: 'Bartender', contacto: '098123123'},
    { id: 3, nombre: 'Pedro', rol: 'Mozo', contacto: '092123123'},
    // ... puedes agregar más items
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.empleados);
  }

  /*openDialog(): void {
    const dialogRef = this.dialog.open(AgregarItemModalComponent, {
      width: '30rem',
      data: {}  // Puedes pasar la data inicial aquí si es necesario.
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
    data: { item: item }  // Pasamos el ítem completo al modal
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aquí puedes eliminar el ítem
      // TODO: Añadir la lógica para eliminar el ítem
    }
  });
}
*/
}
