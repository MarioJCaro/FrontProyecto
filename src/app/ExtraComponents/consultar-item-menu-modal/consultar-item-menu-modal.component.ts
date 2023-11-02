import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Observable, catchError } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { GetAllItemResponse, InventarioService } from 'src/app/services/inventario/inventario.service';
import { MenubackofficeService, addItemInventarioRequest } from 'src/app/services/menubackoffice/menubackoffice.service';


@Component({
  selector: 'app-consultar-item-menu-modal',
  templateUrl: './consultar-item-menu-modal.component.html',
  styleUrls: ['./consultar-item-menu-modal.component.scss']
})
export class ConsultarItemMenuModalComponent {

  catId: number = 0;
  ingredients: number[] = []; // Lista de ingredientes seleccionados
  availableIngredients: string[] = ['Coca Cola 2L', 'Fernet Branca 1L']; // Lista de ingredientes disponibles
  items: Item[] = [];
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  saleType: boolean = false; // Valor por defecto, puedes cambiarlo si lo necesitas


  constructor(public dialogRef: MatDialogRef<ConsultarItemMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventarioService:InventarioService,
    private errorHandler:ErrorHandlingService,
    private menuService: MenubackofficeService,
    private categoriaService: CategoriaService,
    ) { }

  addIngredient(event: MatSelectChange) {
    this.ingredients.push(event.value);
}

ngOnInit() {
  this.getItems();
}

getIdCat(): Promise<number> {
  const nombreCategoria = "Bebidas";
  return new Promise((resolve, reject) => {
    this.categoriaService.getCatByNombre(nombreCategoria).subscribe({
      next: (response) => {
        if (response.items && response.items.length > 0) {
          resolve(response.items[0].id);
        } else {
          console.error('No se encontraron categorías.');
          reject('No se encontraron categorías.');
        }
      },
      error: (error) => {
        console.error("Hubo un error al obtener la categoría: ", error);
        reject(error);
      }
    });
  });
}

async getItems(campo?: any, valor?: any) {
  try {
    const catId = await this.getIdCat();
    this.inventarioService.getAll(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize, "categoriaId", catId).subscribe({
      next: (response: GetAllItemResponse) => {
        const itemsFromResponse = response.items;
      // Recorremos el arreglo de ítems y lo procesamos
      const itemsToAdd = itemsFromResponse.map(item => ({
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        categoria: item.categoria,
        stock: item.stock,
        costo: item.costo,
        cantxCasillero: item.cantxCasillero,
        porUnidad: item.ventaPorUnidad
        // Añade otras propiedades si es necesario
      }));

      this.items = itemsToAdd;
      
      },
      error: (error) => {
        catchError(this.errorHandler.handleError);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

confirmSelection() {
  if (this.saleType && this.ingredients.length > 1) {
    // Mostrar algún mensaje de error al usuario
    console.error('No se puede agregar más de un ítem cuando la venta es por unidad.');
    return;
  }

  const validations = this.ingredients.map(ingredientId =>
    this.inventarioService.getById(ingredientId).toPromise()
  );

  Promise.all(validations).then(items => {
    // Aquí `items` es un arreglo de los ítems recuperados de las promesas

    // Realizar la validación 2 y 3 aquí
    const isSaleTypeTrue = this.saleType === true;

    const invalidItem = items.find(item => item && ((isSaleTypeTrue && item.ventaPorUnidad == false) || (!isSaleTypeTrue && item.ventaPorUnidad == true)));

    if (invalidItem) {
      // Mostrar algún mensaje de error al usuario
      console.error(`El ítem ${invalidItem.nombre} no cumple con las condiciones de venta.`);
      return;
    }

    // Si todas las validaciones pasan, entonces procedemos a enviar los datos
    const formattedItems = this.ingredients.map(ingredientId => ({ id: ingredientId }));
    const itemToSubmit: addItemInventarioRequest = {
      itemsInventario: formattedItems,
      porUnidad: this.saleType
    };

    const id = this.data.id;

    this.menuService.addItemsInventario(id, itemToSubmit).subscribe({
      next: (response) => {
        console.log(response);
        this.dialogRef.close();
      },
      error: (error) => {
        console.error(error); // Manejo de errores
      }
    });
  }).catch(error => {
    console.error('Ocurrió un error al recuperar los detalles del ítem', error);
  });
}

onCancel(): void {
  this.dialogRef.close(false);
}

}
