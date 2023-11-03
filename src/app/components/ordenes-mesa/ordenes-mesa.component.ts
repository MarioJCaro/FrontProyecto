import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Mesa } from 'src/app/models/mesa.model';
import { MesaService } from 'src/app/services/mesa/mesa.service';
import { OrdenResponse, OrdenService } from 'src/app/services/orden/orden.service';
 // Asegúrate de importar el servicio y las interfaces correctas

@Component({
  selector: 'app-ordenes-mesa',
  templateUrl: './ordenes-mesa.component.html',
  styleUrls: ['./ordenes-mesa.component.scss']
})
export class OrdenesMesaComponent implements OnInit {
  ordenes!: OrdenResponse; // Aquí almacenaremos las órdenes de la mesa
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
    // Implementa esta función como lo tenías
  }

  openEditarDialog(): void {
    // Implementa esta función como lo tenías
  }

  getOrdenesMesa(mesaId: number) {
    // Llama a la función del servicio para obtener las órdenes de la mesa
    this.ordenService.getOrdenMesa(mesaId).subscribe(
      (data) => {
        this.ordenes = data; // Almacena las órdenes en la variable
      },
      (error) => {
        console.error('Error al obtener las órdenes de la mesa:', error);
      }
    );
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
