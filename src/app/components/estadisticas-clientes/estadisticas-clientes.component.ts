import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas-clientes',
  templateUrl: './estadisticas-clientes.component.html',
  styleUrls: ['./estadisticas-clientes.component.scss']
})
export class EstadisticasClientesComponent {

  selectedFilter!: string;
  selectedValue!: string;
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  years: number[] = []; // Puedes llenarlo dinámicamente con los años que desees.
  currentOptions: (string | number)[] = [];


  consumoTotalEfectivo!: number;
  topClientes!: any[];
  selectedClient!: string;
  clientConsumption!: number;  // Para almacenar el consumo del cliente seleccionado
  clients: string[] = ['Cliente 1', 'Cliente 2', 'Cliente 3']; // Puedes llenar esta lista desde un servicio o de donde venga tu data.


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
    this.consumoTotalEfectivo = 100000; // Esta sería la lógica para obtener los datos reales
    
    this.topClientes = [
      { nombre: 'Cliente 1', cantidad: '$150'},
      { nombre: 'Cliente 2', cantidad: '$120'},
      { nombre: 'Cliente 3', cantidad: '$100'},
      { nombre: 'Cliente 4', cantidad: '$80'},
      { nombre: 'Cliente 5', cantidad: '$60'}
    ];
  }

  updateClientConsumption(client: string) {
    // Aquí debes buscar el consumo del cliente seleccionado, por ahora pondré un valor fijo como ejemplo.
    // Idealmente deberías tener una función que te retorne este valor desde un servicio o desde un arreglo de datos.
    this.clientConsumption = 100; // Este es solo un valor de ejemplo, reemplázalo por la lógica adecuada.
}

}
