import { Component, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent {
  @ViewChild('comidasPanel') comidasPanel!: MatExpansionPanel;
  @ViewChild('bebidasPanel') bebidasPanel!: MatExpansionPanel;


  constructor() { }

  onPanelClosed(panel: MatExpansionPanel) {
    setTimeout(() => {
        panel.open();
    });
}

  
}
