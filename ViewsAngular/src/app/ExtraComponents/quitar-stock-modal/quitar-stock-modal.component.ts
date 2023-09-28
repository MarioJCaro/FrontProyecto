import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-quitar-stock-modal',
  templateUrl: './quitar-stock-modal.component.html',
  styleUrls: ['./quitar-stock-modal.component.scss']
})
export class QuitarStockModalComponent implements OnInit {
  item: Item;
  currentStock: number;

  constructor(
    public dialogRef: MatDialogRef<QuitarStockModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data.item;
    this.currentStock = this.item.stock;
  }

  ngOnInit(): void {}

  decreaseStock() {
    if (this.currentStock > 0) {
      this.currentStock--;
    }
  }

  increaseStock() {
    if (this.currentStock < this.item.stock) {
      this.currentStock++;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  confirm() {
    // Aquí podrías actualizar el stock en tu base de datos o servicio
    this.dialogRef.close(this.currentStock);
  }
}

