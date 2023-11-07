import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ExitoOrdenMenuComponent } from '../exito-orden-menu/exito-orden-menu.component';
import { itemSeleccionado } from 'src/app/components/home-menu/home-menu.component';
import { CreateOrdenClienteRequest } from 'src/app/services/orden/orden.service';

@Component({
  selector: 'app-confirmar-orden-menu',
  templateUrl: './confirmar-orden-menu.component.html',
  styleUrls: ['./confirmar-orden-menu.component.scss']
})
export class ConfirmarOrdenMenuComponent {
  nombreCliente: string = '';
  cantidadComensales: number = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmarOrdenMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemsMenu: itemSeleccionado[], observaciones: string, totalOrden: number }
  ) {}

  crearOrden(){
    //Primero mapeamos los items
    const itemsParaEnvio = this.data.itemsMenu.map(item => ({
      itemMenuId: item.id,
      cantidad: item.cantidad,
      precio: item.precio
    }));

    //Fecha y hora
    const ahora = new Date();

    const fecha = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
    
    const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;

    //Creamos la request
    const orderRequest: CreateOrdenClienteRequest = {
      fecha: fecha,
      hora: hora,
      responsable: this.nombreCliente,  
      ocupacion: this.cantidadComensales,
      observaciones: this.data.observaciones,
      items: itemsParaEnvio,
      mesas: []
    };

    console.log(orderRequest);
  }

  openModalExito(): void {
    const dialogRef = this.dialog.open(ExitoOrdenMenuComponent, {
      width: '80%',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo fue cerrado', result);
    });
  }
}
