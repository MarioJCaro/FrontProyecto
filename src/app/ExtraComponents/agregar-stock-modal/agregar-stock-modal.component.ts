import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/models/item.model';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventarioService: InventarioService,
    private toastService: ToastService
  ) {
    this.item = data.item;
    this.currentStock = 0;
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

  updateStock(id:number, amount:any){
    const stockData = { amount: amount };
    this.inventarioService.updateStock(id, stockData).subscribe({
      next:(response) => {
        this.toastService.showSuccess("Stock aumentado con exito");
        this.dialogRef.close();
      },
      error:(error) => {
      }
    });
  }

  confirm(): void {
    // Aquí puedes implementar lógica adicional si es necesario
    this.updateStock(this.item.id, this.currentStock);
    this.dialogRef.close();
  }
}
