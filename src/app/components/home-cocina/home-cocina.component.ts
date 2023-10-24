import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/models/orden.model';
import { OrdenResponse, OrdenService } from 'src/app/services/orden/orden.service';
import { environment } from 'src/environments/environments';
import { io, Socket } from 'socket.io-client';
import { MenubackofficeService } from 'src/app/services/menubackoffice/menubackoffice.service';
import { EXCLUDED_GROUPS } from 'src/app/constants/groups.constants'
@Component({
  selector: 'app-home-cocina',
  templateUrl: './home-cocina.component.html',
  styleUrls: ['./home-cocina.component.scss']
})
export class HomeCocinaComponent implements OnInit {
  private socketUrl = environment.socketUrl;
  private socket: Socket;
  ordenes: Orden[] = [];
  filteredItemsMap: { [orderId: number]: any[] } = {};

  constructor(private ordenService: OrdenService, private backOfficeService: MenubackofficeService) { 
    this.socket = io(this.socketUrl);

  }

  ngOnInit(): void {
    this.fetchOrdenesEnCocina();

    this.socket.on('fetchOrdenes', (data: any) => {
      this.fetchOrdenesEnCocina();
    });
  }

  getMesas(orden: Orden): string {
    return orden.mesas.map(mesa => mesa.nroMesa).join(', ');
  }
  

  fetchOrdenesEnCocina(): void {
    this.ordenService.getAll(1, 4, undefined, undefined, 'En cocina').subscribe({
        next: (response: OrdenResponse) => {
            this.ordenes = response.items;

            // Iterar sobre todas las órdenes y obtener los nombres y grupos de los ítems
            for (let orden of this.ordenes) {
                orden.itemNames = {};
                orden.itemGroups = {};
                
                for (let item of orden.items) {
                  
                    this.backOfficeService.getItem(item.itemMenuId).subscribe({
                        next: (response: any) => {
                            orden.itemNames[item.itemMenuId] = response.nombre;
                            orden.itemGroups[item.itemMenuId] = response.grupo.nombre;  // guardar el grupo del ítem
                          
                            this.filteredItemsMap[orden.id] = orden.items.filter(item => !EXCLUDED_GROUPS.includes(orden.itemGroups[item.itemMenuId]));
                          },
                        error: (error) => {
                            console.error('Hubo un error al obtener el nombre del item', error);
                        }
                    });
                    }
            }
            console.log(this.filteredItemsMap);
        },
        error: (error) => {
            console.error('Hubo un error al obtener las órdenes', error);
        }
    });
}



}
