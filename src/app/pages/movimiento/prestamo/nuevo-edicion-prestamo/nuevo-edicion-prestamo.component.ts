import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNil, round } from 'lodash'

@Component({
  selector: 'app-nuevo-edicion-prestamo',
  templateUrl: './nuevo-edicion-prestamo.component.html',
  styles: []
})
export class NuevoEdicionPrestamoComponent implements OnInit {

  private _forma: FormGroup;

  private _credito: any[];
  public get credito(): any[] {
    return this._credito;
  }
  public set credito(v: any[]) {
    this._credito = v;
  }


  public get forma(): FormGroup {
    return this._forma;
  }
  public set forma(v: FormGroup) {
    this._forma = v;
  }


  constructor(private builder: FormBuilder) {
    this.objInit();
    this.simuladorCredito();

  }

  ngOnInit() {
  }

  objInit() {
    this._forma = this.builder.group({
      id: null,
      tipoPagoId: 12,
      plazo: 24,
      fecha: new Date(2015, 1 - 1, 31, 0, 0, 0, 0),
      tasaAnual: 9,
      montoFinanciado: 1000
    })
  }

  simuladorCredito() {
    let cuotas = []
    let fechaInicial: Date = this.forma.value.fecha;
    let nuevaFecha: Date;

    let capital = 0;
    let interes = 0;
    let monto = 0;
    let saldo = 0;

    for (let i = 0; i < this._forma.value.plazo; i++) {
      // calculo de fecha
      if (i === 0) {
        //cuota
        monto = i < 0 ? (capital + interes) :  round(this._forma.value.montoFinanciado *  ((this._forma.value.tasaAnual / 100) / this._forma.value.tipoPagoId) / (1 -  ((1 + ((this._forma.value.tasaAnual / 100) / this._forma.value.tipoPagoId)) ** (-this._forma.value.plazo))),2);
        interes = i <= this._forma.value.plazo ?  round(this._forma.value.montoFinanciado * ((this._forma.value.tasaAnual / 100)/this._forma.value.tipoPagoId), 2) :    0;
        capital = i <= this._forma.value.plazo ? round(monto - interes, 2) :    0;
        saldo =  (i + 1) <= this._forma.value.plazo ? round((this._forma.value.montoFinanciado - capital), 2) :  0;

        console.log(monto, interes, capital);
          cuotas.push({ fecha: this._forma.value.fecha, monto: monto, interes: interes, capital: capital, saldo: saldo })
      } else {
        let fechaAnterior: Date = cuotas[i - 1].fecha;
        let saldoAnterior = cuotas[i - 1].saldo;

        monto = i < 0 ? (capital + interes) :  round(this._forma.value.montoFinanciado *  ((this._forma.value.tasaAnual / 100) / this._forma.value.tipoPagoId) / (1 -  ((1 + ((this._forma.value.tasaAnual / 100) / this._forma.value.tipoPagoId)) ** (-this._forma.value.plazo))), 2);
        interes = i <= this._forma.value.plazo ?  round(saldoAnterior * ((this._forma.value.tasaAnual / 100)/this._forma.value.tipoPagoId), 2) :    0;
        capital = i <= this._forma.value.plazo ?  round(monto - interes, 2) :    0;
        saldo =  (i) <= (this._forma.value.plazo - 1) ? round(saldoAnterior - capital, 2) :  0;
        if ((this._forma.value.plazo - 1) == i){
          saldo =  round(saldoAnterior - capital, 2);
        }



        if (
          (new Date(fechaInicial.getFullYear(), fechaInicial.getMonth(), fechaInicial.getDate())) == (new Date(fechaInicial.getFullYear(), fechaInicial.getMonth() + 1))
        ) {
          nuevaFecha = new Date(fechaAnterior.getFullYear(), fechaAnterior.getMonth() + (12 / this._forma.value.tipoPagoId), fechaInicial.getDate())
        } else {
          nuevaFecha = new Date(fechaAnterior.getFullYear(), fechaAnterior.getMonth() + (12 / this._forma.value.tipoPagoId),
            Math.min(fechaInicial.getDate(), (new Date(fechaAnterior.getFullYear(), (fechaAnterior.getMonth() + (12 / this._forma.value.tipoPagoId)))).getDate()))
        }
        cuotas.push({ fecha: nuevaFecha, monto: monto, interes: interes, capital: capital, saldo: saldo  })
      }

    }

    console.log(cuotas);


  }

}
