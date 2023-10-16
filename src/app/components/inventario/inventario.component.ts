import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarItemModalComponent } from 'src/app/ExtraComponents/agregar-item-modal/agregar-item-modal.component';
import { ModificarItemModalComponent } from 'src/app/ExtraComponents/modificar-item-modal/modificar-item-modal.component';
import { EliminarItemModalComponent } from 'src/app/ExtraComponents/eliminar-item-modal/eliminar-item-modal.component';
import { AgregarStockModalComponent } from 'src/app/ExtraComponents/agregar-stock-modal/agregar-stock-modal.component';
import { QuitarStockModalComponent } from 'src/app/ExtraComponents/quitar-stock-modal/quitar-stock-modal.component';
import { GetAllItemResponse, InventarioService } from 'src/app/services/inventario/inventario.service';
import { catchError } from 'rxjs';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { PageEvent } from '@angular/material/paginator';
import { Categoria } from 'src/app/models/categoria.model';



@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent  implements OnInit {

  displayedColumns: string[] = ['nombre', 'categoria', 'stock', 'costo', 'acciones'];
  dataSource!: MatTableDataSource<Item>;
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  itemsArray: any[] = [];
  filterField: string = '';
  filterValue: string = '';
  categorias: Categoria[] = [];

  constructor(public dialog: MatDialog, private inventarioService:InventarioService, private categoriaService:CategoriaService, private errorHandler:ErrorHandlingService) {}

  ngOnInit() {
    this.getItems();
    this.getCategorias();
  }

  onPaginateChange(event: PageEvent) {
    this.pageEvent = event;
    
    this.getItems();
  }

  getItems(campo?:any , valor?:any){
    this.inventarioService.getAll(this.pageEvent.pageIndex + 1, this.pageEvent.pageSize, this.filterField, this.filterValue).subscribe({
      next:(response: GetAllItemResponse) => {
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
          porUnidad: item.porUnidad
          // Añade otras propiedades si es necesario
        }));
        
        // Agregamos los nuevos ítems al itemsArray
        this.itemsArray = [];
        this.itemsArray = [...this.itemsArray, ...itemsToAdd];

        this.totalCount = response.total;
        this.dataSource = new MatTableDataSource(this.itemsArray);
        
      },
      error:(error) => {
        catchError(this.errorHandler.handleError);
      }
    });
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

onFilterChange(event: any) {
    this.filterField = event.value;
    this.filterValue = ''; // Resetear el valor de filtro
    if (this.filterField === 'categoriaId') { // Actualizar a 'categoriaId'
        this.applyFilter();
    }
}

onCategoryChange(event: any) {
  this.filterValue = event.value;
  this.applyFilter();
}

onSearchChange(value: string) {
  this.filterValue = value;
  this.applyFilter();
}

applyFilter() {
    if (this.filterField && this.filterValue) {
        this.getItems(this.filterField, this.filterValue);
    } else {
        this.getItems();
    }
}

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarItemModalComponent, {
      width: '30rem',
      data: {},  // Puedes pasar la data inicial aquí si es necesario.
      hasBackdrop: true,
      disableClose: false
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }

  openEditDialog(item: Item): void {
    const dialogRef = this.dialog.open(ModificarItemModalComponent, {
      width: '30rem',
      data: item  // Pasa el ítem a modificar como dato.
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar los cambios.
    });
  }

  // En inventario.component.ts

openDeleteDialog(item: Item): void {
  
  const dialogRef = this.dialog.open(EliminarItemModalComponent, {
    width: '15rem',
    data: { item: item },  // Pasamos el ítem completo al modal
  }
  );

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aquí puedes eliminar el ítem
      // TODO: Añadir la lógica para eliminar el ítem
    }
  });
}

openAddStockDialog(item: Item): void {
  const dialogRef = this.dialog.open(AgregarStockModalComponent, {
    width: '25rem',
    data: { item: item }
  });
  
  dialogRef.afterClosed().subscribe(newStock => {
    if (newStock) {
      // Aquí puedes actualizar el stock del ítem
      item.stock = newStock;
    }
  });
}

openRemoveStockDialog(item: Item): void {
  const dialogRef = this.dialog.open(QuitarStockModalComponent, {
    width: '30rem',
    data: { item: item }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      // Actualizar el stock del ítem en base al valor devuelto por el modal
      // TODO: Implementa la lógica para actualizar el stock
      item.stock = result;
    }
  });
}




  
}
