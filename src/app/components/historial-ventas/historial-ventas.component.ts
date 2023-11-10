import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InfoOrdenModalComponent } from 'src/app/ExtraComponents/info-orden-modal/info-orden-modal.component';
import { Orden } from 'src/app/models/orden.model';
import { OrdenService } from 'src/app/services/orden/orden.service';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.scss']
})
export class HistorialVentasComponent {


  displayedColumns: string[] = ['nroOrden','estado', 'fecha', 'hora', 'nroMesa', 'monto', 'mozo', 'acciones'];
  

  dataSource!: MatTableDataSource<Orden>;
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  filterField: string = '';
  filterValue: string = '';


  constructor(
    public dialog: MatDialog,
    private ordenService: OrdenService // Injecta el OrdenService aquí
  ) {}

  ngOnInit() {
    this.loadOrdenes();
  }

  loadOrdenes(event?: PageEvent) {
    const pageIndex = event ? event.pageIndex : this.pageEvent.pageIndex;
    const pageSize = event ? event.pageSize : this.pageEvent.pageSize;
  
    // Inicializar parámetros de filtro con undefined
    let estado, fecha;
  
    // Asignar valor solo al filtro activo, sea estado o fecha
    if (this.filterField === 'estado' && this.filterValue) {
      estado = this.filterValue;
    } else if (this.filterField === 'fecha' && this.filterValue) {
      fecha = this.filterValue;
    }
  
    this.ordenService.getAll(pageIndex + 1, pageSize, undefined, undefined, estado, fecha).subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response.items);
        this.totalCount = response.total;
      },
      error: (error) => {
        // Manejar el error
      }
    });
  }
  
  
  // Métodos para manejar el cambio de filtro
  onFilterChange(event: any) {
    this.filterField = event.value; // 'fecha' o 'estado'
    this.loadOrdenes(); // Recarga los datos con el filtro aplicado
  }

  // Actualiza este método para manejar correctamente ambos tipos de eventos
onFilterValueChange(event: Event | MatDatepickerInputEvent<Date>) {
  // Verifica si el evento es un evento de fecha
  if (event instanceof MatDatepickerInputEvent) {
    // Es un evento de datepicker, maneja la fecha
    if (this.filterField === 'fecha') {
      this.filterValue = event.value ? this.formatDate(event.value) : '';
    }
  } else {
    // No es un evento de datepicker, maneja como evento de input estándar
    const inputElement = event.target as HTMLInputElement;
    this.filterValue = inputElement.value;
  }
  this.loadOrdenes(); // Recarga los datos con el nuevo valor de filtro
}

private formatDate(date: Date): string {
  return new Date(date).toISOString().split('T')[0];
}

  

  onPaginateChange(event: PageEvent) {
    this.loadOrdenes(event);
  }

  getMesas(orden: Orden): string {
    // Comprueba si 'orden.mesas' está definido y no está vacío
    if (orden.mesas && orden.mesas.length > 0) {
      return orden.mesas.map(mesa => mesa.nroMesa).join(', ');
    }
    // Devuelve un guión si no hay mesas
    return '-';
  }
  
  openInfoOrdenModal(venta: any) {
    const dialogRef = this.dialog.open(InfoOrdenModalComponent, {
      width: '35rem', 
      data: venta // Pasamos la venta actual para mostrar su información
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de Información de la Orden fue cerrado', result);
    });
  }
  
}
