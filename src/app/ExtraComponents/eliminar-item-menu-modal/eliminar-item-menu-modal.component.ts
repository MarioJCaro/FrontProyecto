import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-item-menu-modal',
  templateUrl: './eliminar-item-menu-modal.component.html',
  styleUrls: ['./eliminar-item-menu-modal.component.scss']
})
export class EliminarItemMenuModalComponent {


  constructor(
    public dialogRef: MatDialogRef<EliminarItemMenuModalComponent>,
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
