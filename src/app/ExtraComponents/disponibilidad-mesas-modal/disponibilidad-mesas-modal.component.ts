import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-disponibilidad-mesas-modal',
  templateUrl: './disponibilidad-mesas-modal.component.html',
  styleUrls: ['./disponibilidad-mesas-modal.component.scss']
})
export class DisponibilidadMesasModalComponent implements OnInit {

  displayedColumns: string[] = ['mesa','estado'];
  dataSource!: MatTableDataSource<any>;
  
  constructor(public dialogRef: MatDialogRef<DisponibilidadMesasModalComponent>,){
  }

  // Datos ficticios para el dataSource
  mesas: any[] = [
    { id: 1, mesa: 'Mesa 1',estado: true},
    { id: 2, mesa: 'Mesa 2',estado: false},
    { id: 3, mesa: 'Mesa 3',estado: false},
    // ... puedes agregar más items
  ];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.mesas);
  }

  onClose(){
    this.dialogRef.close();
  }
}
