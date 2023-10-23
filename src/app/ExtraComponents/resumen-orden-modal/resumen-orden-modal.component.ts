import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { itemSeleccionadoInterface } from 'src/app/components/menu-mozo/menu-mozo.component';
import { CreateOrdenRequest, ItemsRequest, OrdenService } from 'src/app/services/orden/orden.service';

@Component({
  selector: 'app-resumen-orden-modal',
  templateUrl: './resumen-orden-modal.component.html',
  styleUrls: ['./resumen-orden-modal.component.scss']
})
export class ResumenOrdenModalComponent {
  public observaciones: string = '';

  constructor(
    public dialogRef: MatDialogRef<ResumenOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordenService:OrdenService
    ) { }

    generateOrderRequest(): CreateOrdenRequest {
      const storedValue = localStorage.getItem('empleadoId');
      const empleadoId = storedValue ? +storedValue : 0; // O cualquier valor predeterminado que quieras usar en caso de que no exista.

        // Asumo que el ID está almacenado como string

        const itemsRequest: ItemsRequest[] = this.data.items.map((item: itemSeleccionadoInterface) => {
          return {
            itemMenuId: item.id,
            cantidad: item.cantidad,
            precio: item.precio
          };
        });
        

      const orderRequest: CreateOrdenRequest = {
        fecha: new Date(),
        hora: new Date(),
        responsable: 'nombre del responsable',  // Aquí coloca cómo obtienes el nombre del responsable
        ocupacion: this.data.ordenData.cantComensales,
        observaciones: this.observaciones,
        clienteId: this.data.ordenData.clientePreferencial,
        empleadoId: empleadoId,
        items: itemsRequest,
        mesas: this.data.ordenData.nroMesa
      };

      return orderRequest;
    }

    sendOrder(): void {
      const orderRequest = this.generateOrderRequest();
      console.log('Orden a enviar:', orderRequest);
      this.ordenService.create(orderRequest).subscribe({
        next:response => {
        console.log('Orden creada:', response);
        // Aquí maneja la respuesta, por ejemplo, mostrando un mensaje al usuario
      }, 
        error:error => {
          console.log('Error al crear orden:', error);
      }});
    }
    

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Aquí puedes agregar la lógica para enviar el formulario.
    // Por ahora, simplemente cerraremos el modal y enviaremos la data.
    this.dialogRef.close(this.data);
  }
}