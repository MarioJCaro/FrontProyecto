import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemMenu } from 'src/app/models/itemMenu.model';

@Component({
  selector: 'app-confirmar-accion-modal',
  templateUrl: './confirmar-accion-modal.component.html',
  styleUrls: ['./confirmar-accion-modal.component.scss']
})
export class ConfirmarAccionModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarAccionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemMenu) { }

  

  onConfirm(): void {
    this.dialogRef.close(true); // retornamos true si confirma
  }

  onCancel(): void {
    this.dialogRef.close(false); // retornamos false si cancela
  }

}
