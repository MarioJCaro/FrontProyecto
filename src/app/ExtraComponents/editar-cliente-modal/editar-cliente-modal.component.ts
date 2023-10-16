import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente-modal.component.html',
  styleUrls: ['./editar-cliente-modal.component.scss']
})
export class EditarClienteModalComponent {
  idCliente: number = this.cliente.id;
  ClienteForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.ClienteForm = this.formBuilder.group({
      nombre: [this.cliente.nombre],
      apellido: [this.cliente.apellido],
      telefono: [this.cliente.telefono],
      cuenta: [this.cliente.cuenta]
    });
  }

  updateCliente(cliente:any){
    this.clienteService.update(this.idCliente, cliente).subscribe({
      next:(response) => {
        this.toastService.showSuccess("Item modificado con exito");
        this.dialogRef.close();
      },
      error:(error) => {
      }}
    );
  }

  onSubmit(){
    if (this.ClienteForm.valid) {
      // Puedes acceder a los valores del formulario como this.ItemForm.value
      const formData = this.ClienteForm.value;

      this.updateCliente(formData);

      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
