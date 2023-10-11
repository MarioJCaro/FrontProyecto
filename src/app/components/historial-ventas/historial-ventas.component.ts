import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InfoOrdenModalComponent } from 'src/app/ExtraComponents/info-orden-modal/info-orden-modal.component';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.scss']
})
export class HistorialVentasComponent {


  displayedColumns: string[] = ['nroOrden', 'fecha', 'hora', 'nroMesa', 'monto', 'mozo', 'acciones'];
  dataSource!: MatTableDataSource<any>;

   // Datos ficticios para el dataSource
   ventas: any[] = [
    { nroOrden: 1, fecha: '01/01/2023', hora:'19:15', nroMesa: 1, monto: 500, mozo: 'Juan' },
    { nroOrden: 2, fecha: '01/01/2023', hora:'19:15', nroMesa: 4, monto: 500, mozo: 'Juan' },
    { nroOrden: 3, fecha: '01/01/2023', hora:'19:15', nroMesa: 2, monto: 500, mozo: 'Juan' },
    // ... puedes agregar más items
  ];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.ventas);
  }

  openInfoOrdenModal(venta: any) {
    const dialogRef = this.dialog.open(InfoOrdenModalComponent, {
      width: '600px', 
      data: venta // Pasamos la venta actual para mostrar su información
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de Información de la Orden fue cerrado', result);
    });
  }
  
}
