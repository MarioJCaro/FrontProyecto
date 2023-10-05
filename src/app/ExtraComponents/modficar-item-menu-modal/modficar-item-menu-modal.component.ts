import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriasItemMenu } from 'src/app/enums/categoria-item-menu.enum';

@Component({
  selector: 'app-modificar-item-menu-modal',
  templateUrl: './modficar-item-menu-modal.component.html',
  styleUrls: ['./modficar-item-menu-modal.component.scss']
})
export class ModificarItemMenuModalComponent {

  categorias = CategoriasItemMenu;
  nombre: string;
  categoria: CategoriasItemMenu;
  precio: number;
  descripcion: string;
  selectedImage: any;
  public Object = Object;

  constructor(
    public dialogRef: MatDialogRef<ModificarItemMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
        this.nombre = data.nombre;
        this.categoria = data.categoria;
        this.precio = data.precio;
        this.descripcion = data.descripcion;
        this.selectedImage = data.imagen;
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
    const modifiedItem = {
        nombre: this.nombre,
        categoria: this.categoria,
        precio: this.precio,
        descripcion: this.descripcion,
        imagen: this.selectedImage
    };
    this.dialogRef.close(modifiedItem);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
