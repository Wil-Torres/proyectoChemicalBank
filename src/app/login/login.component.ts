import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/service.index';
import { auth } from 'firebase';
import swal from 'sweetalert';
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usr: any;
  objeto: any = {};
  
  private _auth : AuthService;
  public get auth() : AuthService {
    return this._auth;
  }
  public set auth(v : AuthService) {
    this._auth = v;
  }
  
  constructor(public router: Router, private auth1: AuthService) { 
    this._auth = auth1
  }

  ngOnInit() {
    init_plugins();
    this.auth.user.subscribe(res => {
      this.usr = res;
    })
  }
  /*ingresar(email: string, password: string){
    // this.router.navigate(['/home']);
    this.auth.login(email, password)
    console.log(this.auth.user)
  }*/

  ingresar () {
    this.auth.iniciarSesion(this.objeto.user, this.objeto.password).then( usuario => {
      if (usuario){
        let user = {
          email: usuario.email,
          displayName: usuario.displayName,
          logeado: true,
        }
        localStorage.setItem('usuarioLogeado', JSON.stringify(usuario));
        this.router.navigate(['/']);
      }
    }, err => {
      swal('Ocurrio un problema', err, 'error');
    })

  }

  signUp (email: string, password: string) {
    this.auth.signUp(email, password, {});
  }



}
