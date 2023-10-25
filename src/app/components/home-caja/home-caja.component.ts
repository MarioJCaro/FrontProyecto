import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/models/orden.model';
import { environment } from 'src/environments/environments';
import { io, Socket } from 'socket.io-client';
import { OrdenResponse, OrdenService } from 'src/app/services/orden/orden.service';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';

@Component({
  selector: 'app-home-caja',
  templateUrl: './home-caja.component.html',
  styleUrls: ['./home-caja.component.scss']
})
export class HomeCajaComponent  implements OnInit{
  private socketUrl = environment.socketUrl;
  private socket: Socket;

  ordenes: Orden[] = [];

  constructor(private ordenService: OrdenService, ) {
  this.socket = io(this.socketUrl);

    
   }

  ngOnInit(): void {
    this.fetchOrdenesEnCaja();

    this.socket.on('fetchOrdenes', (data: any) => {
      this.fetchOrdenesEnCaja();
    });
  
  }


  public getCardHeaderStyle(estado: string): object {
    switch (estado) {
        case ESTADOS.POR_CONFIRMAR:
            return { 'background-color': '#FE8C73', 'border': '1px solid #FCFF76' };
        case ESTADOS.EN_COCINA:
            return { 'background-color': '#FFD686' };
        case ESTADOS.PARA_ENTREGAR:
            return { 'background-color': '#E1F180' };
        default:
            return {};
    }
}



  fetchOrdenesEnCaja(): void {
    this.ordenService.getOrdenesCaja().subscribe({
        next: (response: OrdenResponse) => {
            this.ordenes = response.items;
            console.log(this.ordenes);
        },
        error: (error) => {
            console.error('Hubo un error al obtener las órdenes', error);
        }
    });
  }

}
