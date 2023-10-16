import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormGroup y Validators
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-agregar-item-modal',
  templateUrl: './agregar-item-modal.component.html',
  styleUrls: ['./agregar-item-modal.component.scss']
})
export class AgregarItemModalComponent {
  categorias: Categoria[] = [];
  ItemForm!: FormGroup; // No es necesario inicializarlo aquí

  constructor(
    public dialogRef: MatDialogRef<AgregarItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService: CategoriaService, 
    private errorHandler: ErrorHandlingService,
    private formBuilder: FormBuilder,
    private inventarioService: InventarioService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getCategorias();

    this.ItemForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoriaId: ['', Validators.required],
      cantxCasillero: ['', Validators.required],
      costo: ['', Validators.required],
      porUnidad: ['', Validators.required], // Establece un valor predeterminado
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  getCategorias() {
    this.categoriaService.getAll().subscribe(
      (data: Categoria[]) => {
        const categorias: Categoria[] = data.map(categoria  => ({
          id: categoria.id,
          nombre: categoria.nombre,
          createdAt: categoria.createdAt,
          updatedAt: categoria.updatedAt,     
          // Añade otras propiedades si es necesario
        }));

        this.categorias = data;
      },
      (error) => {
        catchError(this.errorHandler.handleError);
      }
    );
  }

  createItem(item : any){
    this.inventarioService.create(item).subscribe({
      next:(response) => {
        this.toastService.showSuccess("Item creado con exito");
        this.dialogRef.close();
      },
      error:(error) => {
        
      }}
    );
  }

  onSubmit() {
    if (this.ItemForm.valid) {
      // Puedes acceder a los valores del formulario como this.ItemForm.value
      const formData = this.ItemForm.value;
      
      if(formData.porUnidad == "unidad"){
        formData.porUnidad = true;
      }else{
        formData.porUnidad = false;
      }

      this.createItem(formData);

      this.dialogRef.close();
    }
  }


}
