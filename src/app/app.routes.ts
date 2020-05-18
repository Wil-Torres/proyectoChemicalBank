//  RUTAS PRINCIPALES
import { RouterModule, Routes } from '@angular/router'

// componentes para rutas principales
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const appRoutes: Routes = [
    // ruta principal
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: NopagefoundComponent},
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true});