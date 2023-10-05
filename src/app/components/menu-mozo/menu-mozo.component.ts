import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResumenOrdenModalComponent } from 'src/app/ExtraComponents/resumen-orden-modal/resumen-orden-modal.component';

@Component({
  selector: 'app-menu-mozo',
  templateUrl: './menu-mozo.component.html',
  styleUrls: ['./menu-mozo.component.scss']
})
export class MenuMozoComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ResumenOrdenModalComponent, {
      width: '30rem',
      data: {}  // Puedes pasar la data inicial aquí si es necesario.
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }



}