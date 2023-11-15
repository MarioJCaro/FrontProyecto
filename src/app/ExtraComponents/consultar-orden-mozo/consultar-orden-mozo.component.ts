import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { itemSeleccionadoInterface } from 'src/app/components/menu-mozo/menu-mozo.component';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';
import { CreateOrdenRequest, ItemsRequest, OrdenService } from 'src/app/services/orden/orden.service';

@Component({
  selector: 'app-consultar-orden-mozo',
  templateUrl: './consultar-orden-mozo.component.html',
  styleUrls: ['./consultar-orden-mozo.component.scss']
})
export class ConsultarOrdenMozoComponent {
  public observaciones: string = '';
  public items !: ItemsRequest[];

  constructor(
    public dialogRef: MatDialogRef<ConsultarOrdenMozoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordenService:OrdenService,
    private router: Router
    ) { 
      if (data.observaciones) {
        this.observaciones = data.observaciones;
      }
    }

    generateOrderRequest(): CreateOrdenRequest {
      const storedValue = localStorage.getItem('empleadoId');
      const empleadoId = storedValue ? +storedValue : 0; // O cualquier valor predeterminado que quieras usar en caso de que no exista.

        // Asumo que el ID está almacenado como string

        const itemsRequest: ItemsRequest[] = this.data.items.map((item: itemSeleccionadoInterface) => {
          return {
            itemMenuId: item.id,
            cantidad: item.cantidad,
            precio: item.precio
          };
        });
        
        const ahora = new Date();

        const fecha = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
        
        const hora = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;

      const orderRequest: CreateOrdenRequest = {
        fecha: fecha,
        hora: hora,
        responsable: this.data.ordenData.nombreCliente,  
        ocupacion: this.data.ordenData.cantComensales,
        observaciones: this.observaciones,
        clienteId: this.data.ordenData.clientePreferencial,
        empleadoId: empleadoId,
        items: itemsRequest,
        mesas: this.data.ordenData.nroMesa,
        estado: ESTADOS.EN_COCINA,
      };
      console.log('clienteId:', orderRequest.clienteId);

      return orderRequest;
    }

    get observacionesSeparadas(): string[] {
      return this.observaciones.split(' & ');
    }

    calcularTotal(): number {
      return this.data.items.reduce((acumulado : number, item : ItemsRequest) => acumulado + (item.cantidad * item.precio), 0);
    }
}
