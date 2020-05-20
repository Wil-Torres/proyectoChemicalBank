import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styles: []
})
export class ListaClienteComponent implements OnInit {

  constructor(private route: Router) {
    let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    if (!user) {
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

  nuevo() {
    this.route.navigate(['/cliente-nuevo']);
  }
  edicion(id: string) {
    this.route.navigate(['/cliente-nuevo', id]);
  }

}
