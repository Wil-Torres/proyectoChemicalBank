import { RouterModule, Routes  } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { HomeComponent } from "./home/home.component";
import { ListaClienteComponent } from "./mantenimiento/clientes/lista-cliente/lista-cliente.component";
import { NuevoEdicionClienteComponent } from "./mantenimiento/clientes/nuevo-edicion-cliente/nuevo-edicion-cliente.component";
import { NuevoEdicionTipoCuentaComponent } from "./mantenimiento/tipoCuenta/nuevo-edicion-tipo-cuenta/nuevo-edicion-tipo-cuenta.component";
import { NuevoEdicionTransaccionComponent } from "./mantenimiento/transaccion/nuevo-edicion-transaccion/nuevo-edicion-transaccion.component";


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'home', component: HomeComponent, data:{titulo: 'Pagina Principal'}},
            {path: 'lista-clientes', component: ListaClienteComponent, data:{titulo: 'Lista'}},
            {path: 'cliente-nuevo', component: NuevoEdicionClienteComponent, data:{titulo: 'Nuevo'}},
            {path: 'cliente-edicion/:id', component: NuevoEdicionClienteComponent, data:{titulo: 'Edicion'}},
            {path: 'tipo-cuenta', component: NuevoEdicionTipoCuentaComponent, data:{titulo: 'Pagina Principal'}},
            {path: 'transaccion', component: NuevoEdicionTransaccionComponent, data:{titulo: 'Pagina Principal'}},
            /* Usuarios */
            // {path: 'usuarios', component: ListaUsuariosComponent, data:{titulo: 'Usuarios'}},
            // {path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil'}},
            {path: '', redirectTo: '/home', pathMatch: 'full'},
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );