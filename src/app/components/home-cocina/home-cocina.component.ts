import { Component, OnInit } from '@angular/core';
import { Orden } from 'src/app/models/orden.model';
import { OrdenResponse, OrdenService } from 'src/app/services/orden/orden.service';
import { environment } from 'src/environments/environments';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-home-cocina',
  templateUrl: './home-cocina.component.html',
  styleUrls: ['./home-cocina.component.scss']
})
export class HomeCocinaComponent implements OnInit {
  private socketUrl = environment.socketUrl;
  private socket: Socket;
  ordenes: Orden[] = [];
  
  constructor(private ordenService: OrdenService) { 
    this.socket = io(this.socketUrl);

  }

  ngOnInit(): void {
    this.fetchOrdensEnCocina();

    this.socket.on('fetchOrdenes', (data: any) => {
      // Aquí puedes actualizar tu estado local, en este caso refrescamos las mesas
      this.fetchOrdensEnCocina();
    });
  }


  fetchOrdensEnCocina(): void {
    this.ordenService.getAll(1, 4, undefined, undefined, 'En cocina').subscribe({
      next: (response: OrdenResponse) => {
        this.ordenes = response.items;
      },
      error: (error) => {
        console.error('Hubo un error al obtener las órdenes', error);
      }
    });
  }
}
