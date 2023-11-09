import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-consultar-orden-caja',
  templateUrl: './consultar-orden-caja.component.html',
  styleUrls: ['./consultar-orden-caja.component.scss']
})
export class ConsultarOrdenCajaComponent {

  constructor(public dialogRef: MatDialogRef<ConsultarOrdenCajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler:ErrorHandlingService
    ) { }

    ngOnInit() {
      console.log(this.data);
      console.log(this.data.items);
    }

}
