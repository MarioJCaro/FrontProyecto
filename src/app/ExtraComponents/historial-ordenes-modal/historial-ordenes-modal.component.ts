import { Component } from '@angular/core';
import { Orden } from 'src/app/models/orden.model';
import { MesasService } from 'src/app/services/mesas/mesas.service';
import { OrdenResponse, OrdenService } from 'src/app/services/orden/orden.service';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';

import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-historial-ordenes-modal',
  templateUrl: './historial-ordenes-modal.component.html',
  styleUrls: ['./historial-ordenes-modal.component.scss']
})
export class HistorialOrdenesModalComponent {
  ordenes: Orden[] = [];
  ESTADOS = ESTADOS; 
  
constructor(private ordenService: OrdenService, private mesasService: MesasService) { }
  ngOnInit(): void {
    this.fetchOrdenesEnCaja();
  }

  fetchOrdenesEnCaja(): void {
    this.ordenService.getHistorialOrdenes().subscribe({
        next: (response: OrdenResponse) => {
            this.ordenes = response.items;
            console.log(this.ordenes);
        },
        error: (error) => {
            console.error('Hubo un error al obtener las órdenes', error);
        }
    });
  }

  getMesas(orden: Orden): string {
    return orden.mesas.map(mesa => mesa.nroMesa).join(', ');
  }

  public getCardHeaderStyle(estado: string): object {
    switch (estado) {
        case ESTADOS.POR_CONFIRMAR:
            return { 'background-color': '#FE8C73', 'border': '1px solid #FCFF76' };
        case ESTADOS.EN_COCINA:
            return { 'background-color': '#FFD686' };
        case ESTADOS.PARA_ENTREGAR:
            return { 'background-color': '#E1F180' };
        case ESTADOS.ENTREGADA:
            return { 'background-color': '#C6F6D5' };    
        case ESTADOS.CANCELADA:
            return { 'background-color': '#e98383' }; 
        default:
            return {};
    }
}

cambiarEstado(ordenId: number, nuevoEstado: string): void {
  const datosActualizar = {
      estado: nuevoEstado
  };

  this.ordenService.updateOrden(ordenId, datosActualizar).subscribe({
      next: (response) => {
          console.log('Orden actualizada, respuesta:', response);
          // Aquí podrías también manejar cualquier lógica post-actualización como alertas de éxito o refrescar la lista de órdenes
      },
      error: (error) => {
          console.error('Hubo un error al actualizar la orden:', error);
          // Aquí podrías manejar errores, como mostrar mensajes de error al usuario
      }
  });
}
  
  
close(){
  this.dialogRef.close();
}

}
