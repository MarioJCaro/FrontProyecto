import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'eliminar-item-modal',
  templateUrl: './eliminar-item-modal.component.html',
  styleUrls: ['./eliminar-item-modal.component.scss']
})
export class EliminarItemModalComponent {


  constructor(
    public dialogRef: MatDialogRef<EliminarItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
