import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-agregar-grupo-modal',
  templateUrl: './agregar-grupo-modal.component.html',
  styleUrls: ['./agregar-grupo-modal.component.scss']
})
export class AgregarGrupoModalComponent {
    GrupoForm!: FormGroup; // No es necesario inicializarlo aquí

    constructor(
      public dialogRef: MatDialogRef<AgregarGrupoModalComponent>,
      private formBuilder: FormBuilder,
      private grupoService: GrupoComidaService,
      private toastService: ToastService,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
      this.GrupoForm = this.formBuilder.group({
        nombre: ['', Validators.required],
      });
    }

    createGrupo(grupo: any){
      this.grupoService.create(grupo).subscribe({
        next:(response) => {
          this.toastService.showSuccess("Item creado con exito");
          this.dialogRef.close();
        },
        error:(error) => {
          
        }}
      );
    }

    onSubmit(): void {
      if (this.GrupoForm.valid) {
        // Puedes acceder a los valores del formulario como this.ItemForm.value
        const formData = this.GrupoForm.value;
  
        this.createGrupo(formData);
  
        this.dialogRef.close();
      }
    }

    onCancel(): void {
      // Cancelar y cerrar el modal sin retornar datos
      this.dialogRef.close();
    }
}
