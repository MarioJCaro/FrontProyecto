import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas-barra',
  templateUrl: './estadisticas-barra.component.html',
  styleUrls: ['./estadisticas-barra.component.scss']
})
export class EstadisticasBarraComponent {


  bebidas = ['Cerveza', 'Vino', 'Whisky', 'Tequila', 'Rum', 'Gin', 'Vodka']; // Ejemplo de bebidas
  selectedBebida!: string;
  historial = [
    { horaAbierto: '19:00', horaCerrado: '20:00', cantTragos: 5 },
    { horaAbierto: '20:00', horaCerrado: '21:00', cantTragos: 7 },
    // ... puedes agregar más registros de ejemplo aquí
  ];
}
