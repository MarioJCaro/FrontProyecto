import { Component } from '@angular/core';
import { DisponibilidadMesasModalComponent } from '../disponibilidad-mesas-modal/disponibilidad-mesas-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { RetirarEfectivoModalComponent } from '../retirar-efectivo-modal/retirar-efectivo-modal.component';
import { IngresarEfectivoModalComponent } from '../ingresar-efectivo-modal/ingresar-efectivo-modal.component';

@Component({
  selector: 'app-footer-caja',
  templateUrl: './footer-caja.component.html',
  styleUrls: ['./footer-caja.component.scss']
})
export class FooterCajaComponent {

  constructor(public dialog: MatDialog) {}

  openDisponibilidadModal(): void {
    const dialogRef = this.dialog.open(DisponibilidadMesasModalComponent, {
      width: '30rem',
    });

}
openRetiroModal(): void {
  const dialogRef = this.dialog.open(RetirarEfectivoModalComponent, {
    width: '30rem',
  });

}
openIngresoModal(): void {
  const dialogRef = this.dialog.open(IngresarEfectivoModalComponent, {
    width: '30rem',
  });

}

}
