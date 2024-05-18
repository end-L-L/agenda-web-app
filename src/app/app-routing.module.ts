import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistroContactoPersonalScreenComponent } from './screens/registro-contacto-personal-screen/registro-contacto-personal-screen.component';
import { DirectorioPersonalScreenComponent } from './screens/directorio-personal-screen/directorio-personal-screen.component';
import { RegistroContactoEmpresarialScreenComponent } from './screens/registro-contacto-empresarial-screen/registro-contacto-empresarial-screen.component';
import { DirectorioEmpresarialScreenComponent } from './screens/directorio-empresarial-screen/directorio-empresarial-screen.component';
import { AgendaScreenComponent } from './screens/agenda-screen/agenda-screen.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent, pathMatch:'full' },
  { path: 'home', component: HomeScreenComponent, pathMatch:'full' },
  { path: 'registro-usuario', component: RegistroScreenComponent, pathMatch:'full' },
  { path: 'registro-contacto-personal', component: RegistroContactoPersonalScreenComponent, pathMatch:'full' },
  { path: 'registro-contacto-personal/:id', component: RegistroContactoPersonalScreenComponent, pathMatch:'full' },
  { path: 'directorio-personal',component: DirectorioPersonalScreenComponent, pathMatch:'full' },
  { path: 'registro-contacto-empresarial', component: RegistroContactoEmpresarialScreenComponent, pathMatch:'full' },
  { path: 'registro-contacto-empresarial/:id', component: RegistroContactoEmpresarialScreenComponent, pathMatch:'full' },
  { path: 'directorio-empresarial', component: DirectorioEmpresarialScreenComponent, pathMatch:'full' },
  { path: 'agenda', component: AgendaScreenComponent, pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
