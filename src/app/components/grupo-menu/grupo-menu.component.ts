import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute
import { MatExpansionPanel } from '@angular/material/expansion';
import { ItemMenuResponse, MenubackofficeService } from 'src/app/services/menubackoffice/menubackoffice.service';
import { SeleccionarItemMenuComponent } from 'src/app/ExtraComponents/seleccionar-item-menu/seleccionar-item-menu.component';

@Component({
  selector: 'app-grupo-menu',
  templateUrl: './grupo-menu.component.html',
  styleUrls: ['./grupo-menu.component.scss']
})
export class GrupoMenuComponent implements OnInit {
  @ViewChild('grupoPanel') grupoPanel!: MatExpansionPanel;
  grupoId!: number; // Aquí almacenaremos el ID del grupo
  itemsDelGrupo: ItemMenuResponse[] = []; // Para almacenar los items del grupo

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    private menubackofficeService: MenubackofficeService, // Inyecta tu servicio
    private router: Router
  ) {}

  ngOnInit() {
    // Obtén el ID del grupo de los parámetros de la ruta de forma segura
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.grupoId = parseInt(routeId, 10);
      this.cargarItemsDelGrupo();
    } else {
      // Manejo del caso en el que 'id' no está presente en la ruta
      console.error('No se encontró el ID del grupo en la ruta');
      // Aquí podrías redirigir al usuario a una ruta de error o manejar este caso como consideres necesario
    }
  }

  cargarItemsDelGrupo() {
    // Llama al servicio con el grupoId obtenido de la ruta
    this.menubackofficeService.getAll(1, 10, 'grupoId', this.grupoId).subscribe({
      next: (response) => {
        this.itemsDelGrupo = response.items;
      },
      error: (error) => {
        console.error('Ocurrió un error al obtener los items del grupo', error);
      }
    });
  }

  openModal(item: ItemMenuResponse) {
    this.dialog.open(SeleccionarItemMenuComponent, {
      width: '80%',
      autoFocus: false,
      data: item // Pasas el ítem aquí
    });
  }

  onPanelClosed(panel: MatExpansionPanel) {
    setTimeout(() => {
        panel.open();
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
