import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';
import { MenuMozoService, ItemMenuResponse } from 'src/app/services/menumozo/menu-mozo.service';
import { GRUPOSVENTARAPIDA } from 'src/app/constants/gruposVentaRapida';
import { forkJoin, map } from 'rxjs';
import { ClienteResponse, ClienteService } from 'src/app/services/cliente/cliente.service';
import { CreateOrdenRequest, ItemsRequest, OrdenService } from 'src/app/services/orden/orden.service';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';
@Component({
  selector: 'app-venta-bebida-modal',
  templateUrl: './venta-bebida-modal.component.html',
  styleUrls: ['./venta-bebida-modal.component.scss']
})
export class VentaBebidaModalComponent implements OnInit {

  displayedColumns: string[] = ['bebida', 'precio', 'cantidad'];
  dataSource: ItemMenuResponse[] = [];
  searchTerm: string = '';
  grupoId = 9;


  public clientesPreferenciales: ClienteResponse[] = [];
  public clienteSeleccionado: ClienteResponse  | undefined;
  public empleadoNombre: string | null = null;
  public horaActual: string | undefined;
  //sirve para guardar los items seleccionados y la cantidad de cada uno
  public selectedItems: { [id: number]: number } = {};



  constructor(private menuService: MenuMozoService, private grupoService: GrupoComidaService, private clienteService: ClienteService, private ordenService: OrdenService) { }
  
  ngOnInit(): void {
    this.empleadoNombre = localStorage.getItem('empleadoNombre');
    this.cargarClientes();
    this.setHoraActual();
    this.loadGrupoIdAndThenMenuItems();
    this.cargarClientes();

}

setHoraActual(): void {
  const now = new Date();
  this.horaActual = now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2);
}

increaseQuantity(itemId: number): void {
  if (this.selectedItems[itemId]) {
      this.selectedItems[itemId]++;
  } else {
      this.selectedItems[itemId] = 1;
  }
}

decreaseQuantity(itemId: number): void {
  if (this.selectedItems[itemId] && this.selectedItems[itemId] > 0) {
      this.selectedItems[itemId]--;
  }
}
getTotal(): number {
  let total = 0;
  for (const item of this.dataSource) {
      if (this.selectedItems[item.id]) {
          total += item.precio * this.selectedItems[item.id];
      }
  }
  return total;
}

prepareCreateOrdenRequest(): CreateOrdenRequest {
  const items: ItemsRequest[] = [];
  for (const item of this.dataSource) {
      if (this.selectedItems[item.id] && this.selectedItems[item.id] > 0) {
          items.push({
              itemMenuId: item.id,
              cantidad: this.selectedItems[item.id],
              precio: item.precio
          });
      }
  }

  const date = new Date();
  const fecha = date.toISOString().split('T')[0];
  const hora = date.toTimeString().split(' ')[0];

  return {
      fecha,
      hora,
      responsable: "venta rapida",
      ocupacion: 0,
      observaciones: 'venta rapida',
      clienteId: this.clienteSeleccionado ? this.clienteSeleccionado.id : null,
      empleadoId: +localStorage.getItem('empleadoId')! ,
      items,
      mesas: [],
      estado: ESTADOS.ENTREGADA
  };
}


onConfirmar(): void {
  const request: CreateOrdenRequest = this.prepareCreateOrdenRequest();

  this.ordenService.create(request).subscribe(
      response => {
          console.log('Orden creada con éxito!', response);
          // Aquí puedes mostrar una notificación de éxito o redirigir al usuario
      },
      error => {
          console.error('Error al crear la orden', error);
          // Aquí puedes mostrar un mensaje de error al usuario
      }
  );
}

cargarClientes(): void {
  this.clienteService.getAllClientesByLimit().subscribe(response => {
    this.clientesPreferenciales = response.items;
  }, error => {
    console.error('Error al cargar los clientes:', error);
  });
}

loadGrupoIdAndThenMenuItems(): void {
  // Convertir los nombres de grupos en un array de observables que obtienen el ID de cada grupo
  const observables = Object.values(GRUPOSVENTARAPIDA).map(grupoNombre => 
    this.grupoService.getGrupoByNombre(grupoNombre).pipe(
      map(response => {
        if (response.items && response.items.length > 0) {
          return response.items[0].id;
        } else {
          throw new Error(`No se encontró el grupo "${grupoNombre}".`);
        }
      })
    )
  );

  // Combina todos los observables en uno y suscríbete a él
  forkJoin(observables).subscribe(grupoIds => {
    // Ahora tienes todos los IDs de grupo en grupoIds
    this.loadMenuItems(grupoIds);
  }, error => {
    console.error('Error al obtener los IDs de grupo:', error);
  });
}




loadMenuItems(grupoIds: number[]): void {
  this.menuService.getAll(1, 100, 'grupoId', grupoIds.join()).subscribe(response => {
      this.dataSource = response.items;
  });
}

  
  searchMenuItems(): void {
    this.menuService.getAll(1, 100, 'nombre', this.searchTerm, 'grupoId', this.grupoId).subscribe(response => {
      this.dataSource = response.items;
    });
}

  
}
