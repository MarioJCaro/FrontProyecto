import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarOrdenModalComponent } from 'src/app/ExtraComponents/agregar-orden-modal/agregar-orden-modal.component';
import { EditarOrdenModalComponent } from 'src/app/ExtraComponents/editar-orden-modal/editar-orden-modal.component';

@Component({
  selector: 'app-ordenes-mesa',
  templateUrl: './ordenes-mesa.component.html',
  styleUrls: ['./ordenes-mesa.component.scss']
})
export class OrdenesMesaComponent {
  constructor(public dialog: MatDialog) {}

  openAgregarDialog(): void {
    const dialogRef = this.dialog.open(AgregarOrdenModalComponent, {
      width: '30rem',
      data: {}  // Puedes pasar la data inicial aquí si es necesario.
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }

  openEditarDialog(): void {
    const dialogRef = this.dialog.open(EditarOrdenModalComponent, {
      width: '30rem',
      data: {}  // Puedes pasar la data inicial aquí si es necesario.
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }
}