import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-agregar-stock-modal',
  templateUrl: './agregar-stock-modal.component.html',
  styleUrls: ['./agregar-stock-modal.component.scss']
})
export class AgregarStockModalComponent implements OnInit {

  item: Item;
  currentStock: number;

  constructor(
    public dialogRef: MatDialogRef<AgregarStockModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.item;
    this.currentStock = this.item.stock;
  }

  ngOnInit(): void {}

  decreaseStock(): void {
    if (this.currentStock > this.item.stock) {
      this.currentStock--;
    }
  }

  increaseStock(): void {
    this.currentStock++;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    // Aquí puedes implementar lógica adicional si es necesario
    this.dialogRef.close(this.currentStock);
  }
}
