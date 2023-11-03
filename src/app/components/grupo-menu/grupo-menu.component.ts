import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { SeleccionarItemMenuComponent } from 'src/app/ExtraComponents/seleccionar-item-menu/seleccionar-item-menu.component';

@Component({
  selector: 'app-grupo-menu',
  templateUrl: './grupo-menu.component.html',
  styleUrls: ['./grupo-menu.component.scss']
})
export class GrupoMenuComponent {
  @ViewChild('grupoPanel') grupoPanel!: MatExpansionPanel;

  constructor(public dialog: MatDialog) {}

  openModal() {
    this.dialog.open(SeleccionarItemMenuComponent, {
      width: '80%',
      autoFocus: false,
      data: { /* aquí puedes pasar datos al modal si es necesario */ }
    });
  }

  onPanelClosed(panel: MatExpansionPanel) {
    setTimeout(() => {
        panel.open();
    });
}
}
