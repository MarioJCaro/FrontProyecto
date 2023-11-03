import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Grupo } from 'src/app/models/grupo.model';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-modificar-grupo-modal',
  templateUrl: './modificar-grupo-modal.component.html',
  styleUrls: ['./modificar-grupo-modal.component.scss']
})
export class ModificarGrupoModalComponent {
  GrupoForm!: FormGroup; // No es necesario inicializarlo aquí
  idGrupo: number = this.grupo.id;

  constructor(
    public dialogRef: MatDialogRef<ModificarGrupoModalComponent>,
    private grupoService: GrupoComidaService,
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public grupo: Grupo) { }

    ngOnInit(): void {
  
      this.GrupoForm = this.formBuilder.group({
        nombre: [this.grupo.nombre],
      });
    }

    onCancel(): void {
      this.dialogRef.close();
    }

    updateGrupo(item: any){
      this.grupoService.update(this.idGrupo, item).subscribe({
        next:(response) => {
          this.toastService.showSuccess("Item modificado con exito");
          this.dialogRef.close();
        },
        error:(error) => {
        }}
      );
    }

    onSubmit() {
      if (this.GrupoForm.valid) {
        // Puedes acceder a los valores del formulario como this.ItemForm.value
        const formData = this.GrupoForm.value;

        this.updateGrupo(formData);
  
        this.dialogRef.close();
      }
    }
}
