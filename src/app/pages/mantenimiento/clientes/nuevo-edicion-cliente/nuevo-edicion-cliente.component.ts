import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-edicion-cliente',
  templateUrl: './nuevo-edicion-cliente.component.html',
  styles: []
})
export class NuevoEdicionClienteComponent implements OnInit {


  private _forma: FormGroup;

  private _objId: string = this.aroute.snapshot.paramMap.get('id');
  public get objId(): string {
    return this._objId;
  }
  public set objId(v: string) {
    this._objId = v;
  }

  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }

  constructor(private builder: FormBuilder, private srv: ClienteService, private route: Router, private aroute: ActivatedRoute) {
    let user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    if (!user) {
      this.route.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.objInit();
    if (this._objId.length !== 0) {
      this.buscarCliente(this.objId);
    }
  }

  objInit() {
    this.forma = this.builder.group({
      id: null,
      codigo: null,
      nombres: null,
      apellidos: null,
      identificacion: null,
      fechaNacimiento: null
    });
  }

  buscarCliente(clienteId: string) {
    this.srv.obtenerCliente(clienteId).subscribe(cliente => {
      this.forma.patchValue(cliente, { emitEvent: false });
    });
  }

  guardar() {
    this.srv.agregarCliente(this.forma.getRawValue()).then(nuevoCliente => {
      nuevoCliente.update({ id: nuevoCliente.id }).then(() => {
        swal('Registro creado', 'Nuevo cliente', 'success').then(() => {
          this.route.navigate(['/cliente-edicion', nuevoCliente.id])
        })
      });
    }).catch(err => {
      swal('Error', err, 'danger').then(() => { });
    });

  }

}
