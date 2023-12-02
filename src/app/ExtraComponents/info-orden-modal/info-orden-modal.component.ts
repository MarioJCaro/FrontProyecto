import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-info-orden-modal',
  templateUrl: './info-orden-modal.component.html',
  styleUrls: ['./info-orden-modal.component.scss']
})
export class InfoOrdenModalComponent {


  constructor(public dialogRef: MatDialogRef<InfoOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler:ErrorHandlingService,
    public dialog: MatDialog,
    ) {}

  ngOnInit(){
    console.log(this.data);
  }
}
