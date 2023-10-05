import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss']
})
export class GestionUsuariosComponent {

  constructor(private router: Router) { }

  navigateTo(route: string) {
    switch(route) {
      case 'empleados':
        this.router.navigate(['/ruta-a-empleados']);
        break;
      case 'clientes':
        this.router.navigate(['/ruta-a-clientes']);
        break;
    }
  }
}
