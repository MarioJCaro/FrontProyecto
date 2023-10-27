import { Component } from '@angular/core';
import { PagarTodoModalComponent } from '../pagar-todo-modal/pagar-todo-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PagarParcialModalComponent } from '../pagar-parcial-modal/pagar-parcial-modal.component';

@Component({
  selector: 'app-ordenes-mesa-caja-modal',
  templateUrl: './ordenes-mesa-caja-modal.component.html',
  styleUrls: ['./ordenes-mesa-caja-modal.component.scss']
})
export class OrdenesMesaCajaModalComponent {

  constructor(public dialog: MatDialog) {}

  openModalPagarTodo(): void {
    const dialogRef = this.dialog.open(PagarTodoModalComponent, {
      width: '30rem',
      
    });

}

openModalPagarParcial(): void {
  const dialogRef = this.dialog.open(PagarParcialModalComponent, {
    width: '30rem',
    
  });

}
}
