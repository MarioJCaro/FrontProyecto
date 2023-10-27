import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccionesBotellasModalComponent } from 'src/app/ExtraComponents/acciones-botellas-modal/acciones-botellas-modal.component';
import { MovimientosCajaModalComponent } from 'src/app/ExtraComponents/movimientos-caja-modal/movimientos-caja-modal.component';
import { OrdenesMesaCajaModalComponent } from 'src/app/ExtraComponents/ordenes-mesa-caja-modal/ordenes-mesa-caja-modal.component';
import { VentaBebidaModalComponent } from 'src/app/ExtraComponents/venta-bebida-modal/venta-bebida-modal.component';

@Component({
  selector: 'app-home-caja',
  templateUrl: './home-caja.component.html',
  styleUrls: ['./home-caja.component.scss']
})
export class HomeCajaComponent {

  constructor(public dialog: MatDialog) {}
  

  openHistoryModal(): void {
    const dialogRef = this.dialog.open(MovimientosCajaModalComponent, {
      width: '90rem',
      
    });

}

openBotellasModal(): void {
  const dialogRef = this.dialog.open(AccionesBotellasModalComponent, {
    width: '90rem',
    height: '50rem',
    
  });

}
openVentaBebidaModal(): void {
  const dialogRef = this.dialog.open(VentaBebidaModalComponent, {
    width: '100rem',
    height: '50rem',
    
  });

}

openOrdenesModal() {
  const dialogRef = this.dialog.open(OrdenesMesaCajaModalComponent, {
    width: '80%' // Aquí puedes pasar las órdenes para esa mesa en específico.
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El dialogo fue cerrado');
    // Aquí puedes manejar cualquier acción después de que el modal se cierre.
  });
}
}