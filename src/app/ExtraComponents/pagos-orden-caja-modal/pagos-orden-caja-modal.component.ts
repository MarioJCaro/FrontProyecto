import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-pagos-orden-caja-modal',
  templateUrl: './pagos-orden-caja-modal.component.html',
  styleUrls: ['./pagos-orden-caja-modal.component.scss']
})
export class PagosOrdenCajaModalComponent {
  constructor(public dialogRef: MatDialogRef<PagosOrdenCajaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler:ErrorHandlingService,
    public dialog: MatDialog,
    ) { }

    ngOnInit():void{
      console.log(this.data);
    }
}
