import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { ListaClienteComponent } from './mantenimiento/clientes/lista-cliente/lista-cliente.component';
import { NuevoEdicionClienteComponent } from './mantenimiento/clientes/nuevo-edicion-cliente/nuevo-edicion-cliente.component';
import { NuevoEdicionTipoCuentaComponent } from './mantenimiento/tipoCuenta/nuevo-edicion-tipo-cuenta/nuevo-edicion-tipo-cuenta.component';
import { NuevoEdicionTransaccionComponent } from './mantenimiento/transaccion/nuevo-edicion-transaccion/nuevo-edicion-transaccion.component';
import { NuevoEdicionChequeComponent } from './movimiento/cheque/nuevo-edicion-cheque/nuevo-edicion-cheque.component';
import { NuevoEdicionDepositoComponent } from './movimiento/deposito/nuevo-edicion-deposito/nuevo-edicion-deposito.component';
import { NuevoEdicionPrestamoComponent } from './movimiento/prestamo/nuevo-edicion-prestamo/nuevo-edicion-prestamo.component';
import { NuevoEdicionPagoServicioComponent } from './movimiento/pagoServicio/nuevo-edicion-pago-servicio/nuevo-edicion-pago-servicio.component';
import { NuevoEdicionTransferenciaComponent } from './movimiento/transferencia/nuevo-edicion-transferencia/nuevo-edicion-transferencia.component';
import { EstadoCuentaBancarioComponent } from './reporte/estado-cuenta-bancario/estado-cuenta-bancario.component';
import { EstadoCuentaPrestamoComponent } from './reporte/estado-cuenta-prestamo/estado-cuenta-prestamo.component';
import { DetalleCuentasComponent } from './mantenimiento/clientes/detalle-cuentas/detalle-cuentas.component';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    NopagefoundComponent,
    ListaClienteComponent,
    NuevoEdicionClienteComponent,
    NuevoEdicionTipoCuentaComponent,
    NuevoEdicionTransaccionComponent,
    NuevoEdicionChequeComponent,
    NuevoEdicionDepositoComponent,
    NuevoEdicionPrestamoComponent,
    NuevoEdicionPagoServicioComponent,
    NuevoEdicionTransferenciaComponent,
    EstadoCuentaBancarioComponent,
    EstadoCuentaPrestamoComponent,
    DetalleCuentasComponent,
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,

    PAGES_ROUTES,
    FormsModule,
    CommonModule,
  ],
  exports: [
    HomeComponent,
    PagesComponent,
    NopagefoundComponent,
  ],
})

export class PagesModule { }
