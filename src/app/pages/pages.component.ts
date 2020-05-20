import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/service.index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  
  private _logeado : boolean = false;
  public get logeado() : boolean  {
    return this._logeado;
  }
  public set logeado(v : boolean ) {
    this._logeado = v;
  }
  

  constructor(private route: Router, private srvAuth: AuthService) {
    let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    if (!user) {
      this._logeado = false;
    }else {
      this._logeado = true;
    }
   }

   login(){
    this.route.navigate(['/login']);
   }

   cerrarSesion(){
     this.srvAuth.signOut().then(() => {
      localStorage.removeItem('usuarioLogeado');
      this.route.navigate(['/']);
      location.reload();
     })

   }

  ngOnInit() {
  }

}
