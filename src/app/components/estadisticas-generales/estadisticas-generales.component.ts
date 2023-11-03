import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas-generales',
  templateUrl: './estadisticas-generales.component.html',
  styleUrls: ['./estadisticas-generales.component.scss']
})
export class EstadisticasGeneralesComponent implements OnInit{

  selectedFilter!: string;
  selectedValue!: string;
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  years: number[] = []; // Puedes llenarlo dinámicamente con los años que desees.
  currentOptions: (string | number)[] = [];


  totalVentas!: number;
  ordenesProcesadas!: number;
  topCincoProductos!: any[];

  constructor() {
    const currentYear = new Date().getFullYear();
    for(let i = 0; i < 10; i++) {  // Añade 10 años al array, desde el año actual.
      this.years.push(currentYear - i);
    }
  }

  ngOnInit(): void {
    // Aquí puedes inicializar tus variables o hacer llamadas iniciales a servicios
    this.fetchData();
  }

  updateSecondSelect(value: string) {
    if (value === 'mes') {
        this.currentOptions = this.months;
    } else if (value === 'año') {
        this.currentOptions = this.years.map(year => year.toString());  // convertir a string
    } else {
        this.currentOptions = [];
    }
    this.selectedValue = this.currentOptions[0].toString();  // convertir a string
}

  private fetchData(): void {
    // Simulando la obtención de datos
    this.totalVentas = 100000; // Esta sería la lógica para obtener los datos reales
    this.ordenesProcesadas = 320;
    this.topCincoProductos = [
      { nombre: 'Producto 1', cantidad: 150, imagen: '../../../assets/Cerveza.jpg' },
      { nombre: 'Producto 2', cantidad: 120, imagen: '../../../assets/Cerveza.jpg' },
      { nombre: 'Producto 3', cantidad: 100, imagen: '../../../assets/Cerveza.jpg' },
      { nombre: 'Producto 4', cantidad: 80, imagen: '../../../assets/Cerveza.jpg' },
      { nombre: 'Producto 5', cantidad: 60, imagen: '../../../assets/Cerveza.jpg' }
    ];
    
  }
}
