import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { GrupoComidaService, GrupoResponse } from 'src/app/services/grupoComida/grupo-comida.service';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class HomeMenuComponent implements OnInit {
  @ViewChild('comidasPanel') comidasPanel!: MatExpansionPanel;
  @ViewChild('bebidasPanel') bebidasPanel!: MatExpansionPanel;

  comidas: GrupoResponse[] = [];
  bebidas: GrupoResponse[] = [];

  constructor( 
    public dialog: MatDialog,
    private grupoComidaService: GrupoComidaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarGrupos();
  }

  cargarGrupos() {
    this.grupoComidaService.getAll().subscribe(response => {
      this.comidas = response.items.filter(grupo => !grupo.esBebida);
      this.bebidas = response.items.filter(grupo => grupo.esBebida);
    });
  }

  onPanelClosed(panel: MatExpansionPanel) {
    setTimeout(() => {
        panel.open();
    });
  }

  verDetallesGrupo(id: number) {
    this.router.navigate(['/grupomenu', id]); // Reemplaza '/ruta-deseada' con la ruta real de tu aplicación
  }
}
