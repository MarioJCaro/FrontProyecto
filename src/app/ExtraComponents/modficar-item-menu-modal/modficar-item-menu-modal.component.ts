import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { CategoriasItemMenu } from 'src/app/enums/categoria-item-menu.enum';
import { Grupo } from 'src/app/models/grupo.model';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { GetAllGruposResponse, GrupoComidaService, GrupoResponse } from 'src/app/services/grupoComida/grupo-comida.service';
import { MenubackofficeService } from 'src/app/services/menubackoffice/menubackoffice.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-modificar-item-menu-modal',
  templateUrl: './modficar-item-menu-modal.component.html',
  styleUrls: ['./modficar-item-menu-modal.component.scss']
})
export class ModificarItemMenuModalComponent {

  grupos: Grupo[] = [];
  ItemMenuForm!: FormGroup; // No es necesario inicializarlo aquí
  selectedImage: any = null;
  idItem: number = this.data.id;

  constructor(
    public dialogRef: MatDialogRef<ModificarItemMenuModalComponent>,
    private grupoComidaService: GrupoComidaService,
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private backofficeService: MenubackofficeService,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

    ngOnInit(): void {
      this.getGrupos();

      this.selectedImage = 'data:image/png;base64,' + this.data.imagen;
      console.log(this.selectedImage);
      this.ItemMenuForm = this.formBuilder.group({
        nombre: [this.data.nombre],
        descripcion: [this.data.descripcion],
        grupoId: ['', Validators.required],
        precio: [this.data.precio],  // Campo de imagen en base64
        imagen: ['']  // Campo de imagen en base64
    });   
    }

    getGrupos() {
      this.grupoComidaService.getAll().subscribe(
        (response: GetAllGruposResponse) => {
          if (Array.isArray(response.items)) {
            const grupos: GrupoResponse[] = response.items.map(categoria  => ({
              id: categoria.id,
              nombre: categoria.nombre
              // Añade otras propiedades si es necesario
            }));
    
            this.grupos = grupos; // Asignar el resultado mapeado a la variable de categorías
          } else {
            console.error('La respuesta del servicio no es un array válido.');
          }
        },
        (error) => {
          catchError(this.errorHandler.handleError);
        }
      );
    }

    onImageSelected(event: any): void {
      const file: File = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
              this.selectedImage = e.target.result;
              this.ItemMenuForm.patchValue({
                  imagen: e.target.result.split(',')[1]  // Guarda solo el contenido base64, no el tipo de datos
              });
          };
          reader.readAsDataURL(file);
      }
    }

  updateItem(item: any){
    this.backofficeService.update(this.idItem, item).subscribe({
      next:(response) => {
        this.toastService.showSuccess("Item modificado con exito");
        this.dialogRef.close();
      },
      error:(error) => {
      }}
    );
  }

  onSubmit(): void {
    if (this.ItemMenuForm.valid) {
      // Puedes acceder a los valores del formulario como this.ItemForm.value
      const formData = this.ItemMenuForm.value;

      this.updateItem(formData);

      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
