import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ItemMenu } from 'src/app/models/itemMenu.model';
import { CategoriasItemMenu } from 'src/app/enums/categoria-item-menu.enum';
import { AgregarItemMenuModalComponent } from 'src/app/ExtraComponents/agregar-item-menu-modal/agregar-item-menu-modal.component';
import { ConsultarItemMenuModalComponent } from 'src/app/ExtraComponents/consultar-item-menu-modal/consultar-item-menu-modal.component';
import { ModificarItemMenuModalComponent } from 'src/app/ExtraComponents/modficar-item-menu-modal/modficar-item-menu-modal.component';
import { ConfirmarAccionModalComponent } from 'src/app/ExtraComponents/confirmar-accion-modal/confirmar-accion-modal.component';
import { EliminarItemMenuModalComponent } from 'src/app/ExtraComponents/eliminar-item-menu-modal/eliminar-item-menu-modal.component';
import { Item } from 'src/app/models/item.model';
import { PageEvent } from '@angular/material/paginator';
import { MenubackofficeService } from 'src/app/services/menubackoffice/menubackoffice.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-back-office-menu',
  templateUrl: './back-office-menu.component.html',
  styleUrls: ['./back-office-menu.component.scss']
})
export class BackOfficeMenuComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'categoria', 'precio', 'acciones'];
  dataSource!: MatTableDataSource<ItemMenu>;
  totalCount: number = 0;
  pageEvent: PageEvent = {pageIndex: 0, pageSize: 10, length: 0};
  itemsArray: any[] = [];
  filterField: string = '';
  filterValue: string = '';

  // Datos ficticios para el dataSource
  items: ItemMenu[] = [
    { id: 1, nombre: 'Producto A', descripcion:'Un item', categoria: CategoriasItemMenu.Cervezas,  precio: 15, imagen: 'link', activo: false },
    { id: 2, nombre: 'Producto B', descripcion:'Un item',  categoria: CategoriasItemMenu.Gramajo, precio: 15, imagen: 'link', activo: true },
    { id: 3, nombre: 'Producto C', descripcion:'Un item',  categoria: CategoriasItemMenu.Hamburguesas , precio: 15, imagen: 'link', activo: true },
    // ... puedes agregar más items
  ];

  constructor(public dialog: MatDialog, private errorHandler:ErrorHandlingService, private router: Router, backofficeService: MenubackofficeService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.items);
  }

  openDialog(): void {
    
    const dialogRef = this.dialog.open(AgregarItemMenuModalComponent, {
      width: '30rem',
      // Puedes pasar data inicial si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            // Agregar lógica aquí para añadir el nuevo ítem al dataSource o enviar al servidor
            this.items.push(result);
            this.dataSource.data = this.items;
            
        }
    });
}

openConsultarItemModal() {
  const dialogRef = this.dialog.open(ConsultarItemMenuModalComponent, {
      width: '500px',  // Establece el ancho del modal
      data: { /* data that you want to send to modal */ }
  });

  dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró', result);
      // Si devuelves algún dato desde el modal, result contendrá esos datos.
  });
}

abrirModal() {
  const dialogRef = this.dialog.open(ConsultarItemMenuModalComponent, {
    width: '400px', // Ajusta el tamaño según tus necesidades
    // data: { algunaData: 'data que desees pasar al modal' } // Opcional
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal fue cerrado', result);
    // Lógica adicional que desees al cerrar el modal
  });
}
openModifyItemModal(item: any) {
  const dialogRef = this.dialog.open(ModificarItemMenuModalComponent, {
    width: '500px',
    data: item
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Aquí puedes manejar la lógica cuando se cierra el modal
      // Por ejemplo, enviar los cambios al servidor.
    }
  });
}

toggleItemVisibility(item: any) {
  const dialogRef = this.dialog.open(ConfirmarAccionModalComponent, {
    width: '400px',
    data: item // pasamos el ítem al modal
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      item.activo = !item.activo; // cambiamos la visibilidad del ítem
      // Aquí puedes también hacer alguna llamada al servidor para guardar el cambio, si es necesario.
    }
  });
}

openDeleteDialog(item: Item): void {
  
  const dialogRef = this.dialog.open(EliminarItemMenuModalComponent, {
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
}
