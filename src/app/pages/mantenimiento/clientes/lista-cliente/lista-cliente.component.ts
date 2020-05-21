import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html',
  styles: []
})
export class ListaClienteComponent implements OnInit {


  
  private _clientes : any[] = [];
  public get clientes() : any[] {
    return this._clientes;
  }
  public set clientes(v : any[]) {
    this._clientes = v;
  }
  
  constructor(private route: Router, private srv:  ClienteService) { }

  ngOnInit() {
    this.srv.obtenerClientes().subscribe(cliente => {
      this.clientes = cliente;

    })
  }

  nuevo (){
    this.route.navigate(['/cliente-nuevo']);
  }
  edicion(id:string){
    this.route.navigate(['//cliente-edicion',id]);
  }

}
