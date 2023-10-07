import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs';
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
