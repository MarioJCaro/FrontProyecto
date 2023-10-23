import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ResumenOrdenModalComponent } from 'src/app/ExtraComponents/resumen-orden-modal/resumen-orden-modal.component';
import { DataTransferService } from 'src/app/services/DataTransferService/data-transfer-service.service';

@Component({
  selector: 'app-menu-mozo',
  templateUrl: './menu-mozo.component.html',
  styleUrls: ['./menu-mozo.component.scss']
})
export class MenuMozoComponent {
  private destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private dataTransferService: DataTransferService // Inyectar el servicio
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



}