import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from '@angular/core/src/render3';
import swal from 'sweetalert';

@Component({
  selector: 'app-detalle-cuentas',
  templateUrl: './detalle-cuentas.component.html',
  styles: []
})
export class DetalleCuentasComponent implements OnInit {



  private _forma: FormGroup;
  private _objId: string = this.aroute.snapshot.paramMap.get('id');

  private _cuentas: any[] = [];
  private _tiposCuenta: any[] = [{ id: 1, descripcion: 'Monetaria' }, { id: 2, descripcion: 'Ahorros' }, { id: 3, descripcion: 'Plazo Fijo' }];
  private _monedas: any[] = [{ id: 1, descripcion: 'Quetzal' }, { id: 2, descripcion: 'Dolar' }, { id: 3, descripcion: 'Euro' }];
  public get monedas(): any[] {
    return this._monedas;
  }
  public set monedas(v: any[]) {
    this._monedas = v;
  }

  public get tiposCuenta(): any[] {
    return this._tiposCuenta;
  }
  public set tiposCuenta(v: any[]) {
    this._tiposCuenta = v;
  }

  public get cuentas(): any[] {
    return this._cuentas;
  }
  public set cuentas(v: any[]) {
    this._cuentas = v;
  }

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

  constructor(private builder: FormBuilder, private srv: ClienteService, private route: Router, private aroute: ActivatedRoute) { }

  ngOnInit() {

    this.objInit();
    if (this._objId.length !== 0) {
      this.buscarCliente(this.objId);
    }

  }

  objInit() {
    this.forma = this.builder.group({
      id: null,
      tipoCuentaId: null,
      tipoCuenta: this.builder.group({
        id: null,descripcion:null
      }),
      monedaId: null,
      moneda:  this.builder.group({
        id: null,descripcion:null
      }),
      numeroCuenta: null
    });
  }

  buscarCliente(clienteId: string) {
    this.srv.obtenerClienteCuenta(clienteId).subscribe(cuentas => {
      this._cuentas = cuentas;
    });
  }

  alCambiarMoneda(id: number) {
    console.log(id)
    let moneda = this.monedas.find(elemt => {
      return elemt.id == id;
    })
    if (moneda){
      this.forma.patchValue({moneda: moneda});
    }

  }

  alCambiarTipoCuenta(id:number) {
    console.log(id)
    let tipoCuenta = this.tiposCuenta.find(elemt => {
      return elemt.id == id;
    })
    if (tipoCuenta){
      this.forma.patchValue({tipoCuenta: tipoCuenta});
    }


  }

  guardar() {
    this.forma.patchValue({numeroCuenta: this.srv.obtenerCuenta()})
    this.srv.agregarCuenta(this._objId,this.forma.getRawValue()).then(nuevoCliente => {
      nuevoCliente.update({ id: nuevoCliente.id }).then(() => {
        swal('Registro creado', 'Nueva cuenta', 'success').then(() => {
          this.route.navigate(['/cliente-edicion', nuevoCliente.id])
        })
      });
    }).catch(err => {
      swal('Error', err, 'danger').then(() => { });
    });

  }

  limpiar() {
    this.forma.reset();
  }


}
