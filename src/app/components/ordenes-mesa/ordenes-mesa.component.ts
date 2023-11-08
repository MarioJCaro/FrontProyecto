import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AgregarOrdenModalComponent } from 'src/app/ExtraComponents/agregar-orden-modal/agregar-orden-modal.component';
import { ConfirmarCancelarOrdenModalComponent } from 'src/app/ExtraComponents/confirmar-cancelar-orden-modal/confirmar-cancelar-orden-modal/confirmar-cancelar-orden-modal.component';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';
import { Mesa } from 'src/app/models/mesa.model';
import { Orden } from 'src/app/models/orden.model';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { OrdenResponse, OrdenService, UpdateOrdenRequest } from 'src/app/services/orden/orden.service';
 // Asegúrate de importar el servicio y las interfaces correctas

@Component({
  selector: 'app-ordenes-mesa',
  templateUrl: './ordenes-mesa.component.html',
  styleUrls: ['./ordenes-mesa.component.scss']
})
export class OrdenesMesaComponent implements OnInit {
  ordenes!: Orden[]; // Aquí almacenaremos las órdenes de la mesa
  mesa! : Mesa;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private ordenService: OrdenService,
    private mesaService: MesaService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const mesaId = +params['num']; // Convierte el valor de texto en un número
      console.log('Número de mesa recibido:', mesaId);
  
      // Llama a la función para obtener la mesa
      this.getMesa(mesaId);
  
      // Llama a la función para obtener las órdenes de la mesa
      this.getOrdenesMesa(mesaId);
    });
  }

  openAgregarDialog(): void {
    const dialogRef = this.dialog.open(AgregarOrdenModalComponent, {
      width: '30rem',
      data: {}  // Puedes pasar la data inicial aquí si es necesario.
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }

  openEditarDialog(): void {
    // Implementa esta función como lo tenías
  }

  getOrdenesMesa(mesaId: number) {
    // Llama a la función del servicio para obtener las órdenes de la mesa
    this.ordenService.getOrdenMesa(mesaId).subscribe({
      next:(data) => {
        this.ordenes = data.items; // Almacena las órdenes en la variable
      },
      error:(error) => {
        console.error('Error al obtener las órdenes de la mesa:', error);
      }}
    );
  }

  confirmarOrden(id: number){
    const datosActualizar: UpdateOrdenRequest = {
      estado: ESTADOS.ENTREGADA, // Aquí estamos actualizando el estado de la orden
    };

    // Llamamos al método de actualización del servicio y nos suscribimos al Observable
    this.ordenService.updateOrden(id, datosActualizar).subscribe({
      next: (response) => {
        console.log('Orden actualizada, respuesta:', response);
        this.getOrdenesMesa(this.mesa.id);
        // Aquí podrías también manejar cualquier lógica post-actualización como alertas de éxito o refrescar la lista de órdenes
      },
      error: (error) => {
        console.error('Hubo un error al actualizar la orden:', error);
        // Aquí podrías manejar errores, como mostrar mensajes de error al usuario
      }
    });
  }

  openCancelarOrdenModal(id : number){
    const dialogRef = this.dialog.open(ConfirmarCancelarOrdenModalComponent, {
      width: '15rem',
      data: { id },  // Pasamos el ítem completo al modal
    }
    );
  
    dialogRef.afterClosed().subscribe(result => {
      this.getOrdenesMesa(this.mesa.id);
    });
    
  }

  getMesa(mesaId: number) {
    this.mesaService.getById(mesaId).subscribe(
      (data) => {
        this.mesa = data; // Almacena la mesa en la variable
      },
      (error) => {
        console.error('Error al obtener la mesa:', error);
      }
    );
  }
  
}
