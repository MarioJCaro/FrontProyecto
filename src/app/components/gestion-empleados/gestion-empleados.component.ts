import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AgregarEmpleadoModalComponent } from 'src/app/ExtraComponents/agregar-empleado-modal/agregar-empleado-modal.component';
import { EditarEmpleadoModalComponent } from 'src/app/ExtraComponents/editar-empleado-modal/editar-empleado-modal.component';
import { EliminarEmpleadoModalComponent } from 'src/app/ExtraComponents/eliminar-empleado-modal/eliminar-empleado-modal.component';
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
    { id: 1, nombre: 'Pepe',apellido:'Ramirez', telefono: '099123123', nick:'elpepe',password:'12345', rol: 'Chef', activo:true},
    { id: 2, nombre: 'Juan',apellido:'Algo', telefono: '092123123', nick:'juancho',password:'12345', rol: 'Bartender', activo:true},
    { id: 3, nombre: 'Pedro', apellido:'Algo', telefono: '098123123', nick:'pedron',password:'12345', rol: 'Mozo',  activo:true}, 
    // ... puedes agregar más items
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.empleados);
  }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AgregarEmpleadoModalComponent, {
      width: '30rem'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes agregar el nuevo empleado al arreglo de empleados
        this.empleados.push(result);
        this.dataSource = new MatTableDataSource(this.empleados); // Actualizar el dataSource
      }
    });
  }

  openEditDialog(empleado: Empleado): void {
    const dialogRef = this.dialog.open(EditarEmpleadoModalComponent, {
      width: '400px',
      data: { ...empleado } // pasamos una copia del empleado para evitar ediciones no deseadas
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar lo que quieras hacer cuando el modal se cierre, como actualizar el empleado en la lista o en una base de datos.
      }
    });
  }

  eliminarEmpleado(empleado: Empleado) {
    const dialogRef = this.dialog.open(EliminarEmpleadoModalComponent, {
      width: '300px',
      data: {nombre: empleado.nombre}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí se coloca la lógica para eliminar el empleado
        // Por ejemplo: this.empleadosService.eliminar(empleado.id);
        console.log(`Empleado ${empleado.nombre} eliminado`);
      } else {
        console.log('Operación cancelada');
      }
    });
  }
  
  
  
  
}