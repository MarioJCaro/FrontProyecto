import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/models/item.model';
import { CompraService, CreateCompraRequest } from 'src/app/services/compra/compra.service';
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
    private compraService: CompraService,
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

  updateStock(id:number, amount:number){
    const empleadoId = localStorage.getItem('empleadoId');

    if (!empleadoId) {
      this.toastService.showError('No se encontró el ID del empleado en la sesión');
      return;
    }

     // Obtiene la fecha y hora actuales
    // Crear objeto Date para la fecha actual con la hora a 00:00:00.000
    const fecha = new Date();
    fecha.setHours(0, 0, 0, 0);

    // Crear objeto Date para la hora actual manteniendo la fecha neutra (p.ej., 1970-01-01)
    const hora = new Date();
    const neutralDate = new Date(0);
    neutralDate.setHours(hora.getHours(), hora.getMinutes(), hora.getSeconds());
 

    // Debes definir los otros campos del CreateCompraRequest basado en tu lógica de negocio
    const compraData: CreateCompraRequest = {
      fecha: fecha, // Usa la fecha actual o la que corresponda
      hora: hora,  // Usa la hora actual o la que corresponda
      cantidadxCasillero: this.item.cantxCasillero, // Ajusta este valor según tu lógica de negocio
      cantidad: amount,
      empleadoId: +empleadoId, // Asumo que obtendrás el id del empleado de alguna parte
      itemInventarioId: id,
    };

    this.compraService.create(compraData).subscribe({
      next: (response) => {
        this.toastService.showSuccess("Compra registrada y stock actualizado con éxito");
        this.dialogRef.close();
      },
      error: (error) => {
        this.toastService.showError("Hubo un error al registrar la compra");
      }
    });
  }

  confirm(): void {
    // Aquí puedes implementar lógica adicional si es necesario
    this.updateStock(this.item.id, this.currentStock);
    this.dialogRef.close();
  }
}
