import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LiberarMesaModalComponent } from 'src/app/ExtraComponents/liberar-mesa-modal/liberar-mesa-modal.component';

@Component({
  selector: 'app-home-mozo',
  templateUrl: './home-mozo.component.html',
  styleUrls: ['./home-mozo.component.scss']
})
export class HomeMozoComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(LiberarMesaModalComponent, {
      width: '30rem',
      data: {}  // Puedes pasar la data inicial aquí si es necesario.
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }
}