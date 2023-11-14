import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-historial-ordenes-modal',
  templateUrl: './historial-ordenes-modal.component.html',
  styleUrls: ['./historial-ordenes-modal.component.scss']
})
export class HistorialOrdenesModalComponent {

  constructor(
    public dialogRef: MatDialogRef<HistorialOrdenesModalComponent>,
  ){}

  close(){
    this.dialogRef.close();
  }
}
