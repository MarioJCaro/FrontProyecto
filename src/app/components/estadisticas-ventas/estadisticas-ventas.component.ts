import { Component, OnInit } from '@angular/core';
import { ChartDataset, Color } from 'chart.js';




@Component({
  selector: 'app-estadisticas-ventas',
  templateUrl: './estadisticas-ventas.component.html',
  styleUrls: ['./estadisticas-ventas.component.scss']
})


    export class EstadisticasVentasComponent implements OnInit {
      selectedView: string = 'Mensual';  // Por defecto
      selectedOption!: string;

      public lineChartData: ChartDataset[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ventas', borderColor: 'black', backgroundColor: 'rgba(255,0,0,0.3)' }
      ];
      public lineChartLabels: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
      public lineChartLegend = true;
      public lineChartType:any = 'line';

      public lineChartOptions: any = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
    
      constructor() { }

      ngOnInit(): void { }

      updateView(view: string) {
        this.selectedView = view;

        switch (view) {
            case 'HorasPico':
                this.lineChartLabels = [...Array(24).keys()].map(hour => `${hour}:00`);
                this.lineChartData[0].label = 'Transacciones';
                // Generamos datos aleatorios entre 10 y 200 transacciones por hora
                this.lineChartData[0].data = this.generateRandomData(24, 10, 200);
                break;

            case 'Mensual':
                const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                this.lineChartLabels = [...Array(daysInMonth).keys()].map(day => `${day + 1}`);
                this.lineChartData[0].label = 'Cantidad de dinero';
                // Generamos datos aleatorios de ingresos entre $1000 y $5000 por día
                this.lineChartData[0].data = this.generateRandomData(daysInMonth, 1000, 5000);
                break;

            case 'Anual':
                this.lineChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                this.lineChartData[0].label = 'Cantidad de dinero';
                // Generamos datos aleatorios de ingresos entre $20,000 y $50,000 por mes
                this.lineChartData[0].data = this.generateRandomData(12, 20000, 50000);
                break;

            default:
                break;
        }
    }

    generateRandomData(count: number, min: number, max: number): number[] {
        return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min));
    }
    }
    