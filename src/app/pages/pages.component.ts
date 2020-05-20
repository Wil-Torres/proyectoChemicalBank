import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  

  constructor(private route: Router) {
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

  ngOnInit() {
  }

}
