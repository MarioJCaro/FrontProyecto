import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExitoOrdenMenuComponent } from '../exito-orden-menu/exito-orden-menu.component';

@Component({
  selector: 'app-confirmar-orden-menu',
  templateUrl: './confirmar-orden-menu.component.html',
  styleUrls: ['./confirmar-orden-menu.component.scss']
})
export class ConfirmarOrdenMenuComponent {

  constructor(public dialog: MatDialog) {}

  openModalExito(): void {
    const dialogRef = this.dialog.open(ExitoOrdenMenuComponent, {
      width: '80%',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo fue cerrado', result);
    });
  }
}
