import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ResumenOrdenModalComponent } from 'src/app/ExtraComponents/resumen-orden-modal/resumen-orden-modal.component';
import { Grupo } from 'src/app/models/grupo.model';
import { ItemMenu } from 'src/app/models/itemMenu.model';
import { DataTransferService } from 'src/app/services/DataTransferService/data-transfer-service.service';
import { GrupoComidaService } from 'src/app/services/grupoComida/grupo-comida.service';
import {  MenuMozoService, ItemMenuResponse } from 'src/app/services/menumozo/menu-mozo.service';

@Component({
  selector: 'app-menu-mozo',
  templateUrl: './menu-mozo.component.html',
  styleUrls: ['./menu-mozo.component.scss']
})
export class MenuMozoComponent {
  private destroy$ = new Subject<void>();
  public grupos: Grupo[] =  [];
  public itemsPorGrupo: { [grupoId: number]: ItemMenuResponse[] } = {};

  constructor(
    public dialog: MatDialog,
    private dataTransferService: DataTransferService, // Inyectar el servicio
    private grupoComidaService: GrupoComidaService,
    private menuMozoService: MenuMozoService
  ) {
    // Subscribirse al servicio para recibir los datos
    this.dataTransferService.ordenData$
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      if (data) {
        console.log('Datos recibidos:', data);
        // Aquí puedes manejar y usar los datos recibidos
      }
    });

    this.getAllGrupos();


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(ResumenOrdenModalComponent, {
      width: '30rem',
      data: {}  // Puedes pasar la data inicial aquí si es necesario.
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
      // Aquí puedes manejar el resultado del modal, por ejemplo, guardar el nuevo ítem.
    });
  }

  //función para obtener todos los grupos de comidas del sistema
  getAllGrupos() {
    this.grupoComidaService.getAll().subscribe({
        next: (response) => {
            this.grupos = response.items;
            this.grupos.forEach(grupo => {
                this.menuMozoService.getAll(-1, 100, 'grupoId', grupo.id).subscribe({
                    next: (itemsResponse) => {
                        this.itemsPorGrupo[grupo.id] = itemsResponse.items;
                    },
                    error: (error) => {
                        console.log('Error al obtener items por grupo', error);
                    }
                });
            });
        },
        error: (error) => {
            console.log(error);
        }
    });
}



}