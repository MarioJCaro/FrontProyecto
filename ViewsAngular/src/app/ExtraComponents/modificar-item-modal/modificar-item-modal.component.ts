import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-modificar-item-modal',
  templateUrl: './modificar-item-modal.component.html',
  styleUrls: ['./modificar-item-modal.component.scss']
})
export class ModificarItemModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ModificarItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public item: Item) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Puedes agregar más métodos según lo necesites, por ejemplo, para guardar los cambios.

}
