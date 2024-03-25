import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistroContactoPersonalScreenComponent } from './screens/registro-contacto-personal-screen/registro-contacto-personal-screen.component';


const routes: Routes = [
  { path: '', component: LoginScreenComponent, pathMatch:'full' },
  { path: 'home', component: HomeScreenComponent, pathMatch:'full' },
  { path: 'registro-usuario', component: RegistroScreenComponent, pathMatch:'full' },
  { path: 'registro-contacto-personal', component: RegistroContactoPersonalScreenComponent, pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
