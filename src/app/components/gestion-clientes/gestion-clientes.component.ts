import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs';
import { AgregarClienteModalComponent } from 'src/app/ExtraComponents/agregar-cliente-modal/agregar-cliente-modal.component';
import { EditarClienteModalComponent } from 'src/app/ExtraComponents/editar-cliente-modal/editar-cliente-modal.component';
import { EliminarClienteModalComponent } from 'src/app/ExtraComponents/eliminar-cliente-modal/eliminar-cliente-modal.component';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService, CreateClienteResponse } from 'src/app/services/cliente/cliente.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.scss']
})
export class GestionClientesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'cuenta', 'contacto', 'acciones'];
  dataSource!: MatTableDataSource<Cliente>;


  constructor(public dialog: MatDialog, private clienteService:ClienteService, private errorHandler:ErrorHandlingService) {}

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    this.clienteService.getAll().subscribe(
      (data: Cliente[]) => {
        const clientes: Cliente[] = data.map(cliente => ({
          id: cliente.id,
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          telefono: cliente.telefono,
          cuenta: cliente.cuenta,
          createdAt: cliente.createdAt,
          updatedAt: cliente.updatedAt
          // Añade otras propiedades si es necesario
        }));

        this.dataSource = new MatTableDataSource(clientes);
      },
      (error) => {
        catchError(this.errorHandler.handleError);
      }
    );
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AgregarClienteModalComponent, {
      width: '30rem'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes agregar el nuevo empleado al arreglo de empleados
        this.clientes.push(result);
        this.dataSource = new MatTableDataSource(this.clientes); // Actualizar el dataSource
      }
    });
  }

  openEditDialog(cliente: Cliente): void {
    const dialogRef = this.dialog.open(EditarClienteModalComponent, {
      width: '400px',
      data: { ...cliente } // pasamos una copia del empleado para evitar ediciones no deseadas
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar lo que quieras hacer cuando el modal se cierre, como actualizar el empleado en la lista o en una base de datos.
      }
    });
  }

  eliminarCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(EliminarClienteModalComponent, {
      width: '300px',
      data: {nombre: cliente.nombre}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí se coloca la lógica para eliminar el empleado
        // Por ejemplo: this.empleadosService.eliminar(empleado.id);
        console.log(`Cliente ${cliente.nombre} eliminado`);
      } else {
        console.log('Operación cancelada');
      }
    });
  }
  
  
}
