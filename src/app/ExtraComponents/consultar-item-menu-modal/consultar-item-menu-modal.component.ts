import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-consultar-item-menu-modal',
  templateUrl: './consultar-item-menu-modal.component.html',
  styleUrls: ['./consultar-item-menu-modal.component.scss']
})
export class ConsultarItemMenuModalComponent {

  ingredients: string[] = []; // Lista de ingredientes seleccionados
  availableIngredients: string[] = ['Coca Cola 2L', 'Fernet Branca 1L']; // Lista de ingredientes disponibles


  constructor(public dialogRef: MatDialogRef<ConsultarItemMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  addIngredient(event: MatSelectChange) {
    this.ingredients.push(event.value);
}




 
}
