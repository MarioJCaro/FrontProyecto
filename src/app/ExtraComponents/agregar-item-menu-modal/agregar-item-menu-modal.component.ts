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
  selector: 'app-agregar-item-menu-modal',
  templateUrl: './agregar-item-menu-modal.component.html',
  styleUrls: ['./agregar-item-menu-modal.component.scss']
})
export class AgregarItemMenuModalComponent {
  grupos: Grupo[] = [];
  ItemMenuForm!: FormGroup; // No es necesario inicializarlo aquí
  selectedImage: any = null;

  constructor(
    public dialogRef: MatDialogRef<AgregarItemMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private grupoComidaService: GrupoComidaService, 
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private backofficeService: MenubackofficeService,
    private toastService: ToastService) { }

    ngOnInit(): void {
      this.getGrupos();
  
      this.ItemMenuForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        grupos: ['', Validators.required],
        precio: ['', Validators.required],
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
          };
          reader.readAsDataURL(file);
      }
  }

    onSubmit(): void {
        
    }

    onCancel(): void {
        // Cierra el modal sin hacer nada
        this.dialogRef.close(); // Por ejemplo
    }
  
  
  }
