import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriasItemMenu } from 'src/app/enums/categoria-item-menu.enum';

@Component({
  selector: 'app-agregar-item-menu-modal',
  templateUrl: './agregar-item-menu-modal.component.html',
  styleUrls: ['./agregar-item-menu-modal.component.scss']
})
export class AgregarItemMenuModalComponent {

  categorias = CategoriasItemMenu;
  nombre: string = '';
  categoria!: CategoriasItemMenu;
  precio!: number;
  descripcion: string = '';
  selectedImage: any = null;
  public Object = Object;

  constructor(
    public dialogRef: MatDialogRef<AgregarItemMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



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
    // Aquí procesa y envía la información al servidor o al servicio correspondiente
    const newItem = {
        nombre: this.nombre,
        categoria: this.categoria,
        precio: this.precio,
        descripcion: this.descripcion,
        imagen: this.selectedImage
    };

    // Luego, limpia los campos si es necesario y cierra el modal
    this.dialogRef.close(newItem); // Por ejemplo
}

onCancel(): void {
    // Cierra el modal sin hacer nada
     this.dialogRef.close(); // Por ejemplo
}
  
  
  }
