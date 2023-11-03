import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ConfirmarOrdenMenuComponent } from 'src/app/ExtraComponents/confirmar-orden-menu/confirmar-orden-menu.component';

@Component({
  selector: 'app-resumen-orden-menu',
  templateUrl: './resumen-orden-menu.component.html',
  styleUrls: ['./resumen-orden-menu.component.scss']
})
export class ResumenOrdenMenuComponent {

  @ViewChild('bebidasPanel') resumenPanel!: MatExpansionPanel;


  constructor(public dialog: MatDialog) {}

  onPanelClosed(panel: MatExpansionPanel) {
    setTimeout(() => {
        panel.open();
    });
}

openDialog(): void {
  const dialogRef = this.dialog.open(ConfirmarOrdenMenuComponent, {
    width: '80%',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El dialogo fue cerrado', result);
  });
}
}
