// Angular
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Mat Table
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

// HTTP Services
import { HttpClientModule } from '@angular/common/http';

// Screens
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistroContactoPersonalScreenComponent } from './screens/registro-contacto-personal-screen/registro-contacto-personal-screen.component';
import { DirectorioPersonalScreenComponent } from './screens/directorio-personal-screen/directorio-personal-screen.component';
import { RegistroContactoEmpresarialScreenComponent } from './screens/registro-contacto-empresarial-screen/registro-contacto-empresarial-screen.component';
import { DirectorioEmpresarialScreenComponent } from './screens/directorio-empresarial-screen/directorio-empresarial-screen.component';
import { AgendaScreenComponent } from './screens/agenda-screen/agenda-screen.component';

// Partials & Modals
import { NavbarComponent } from './partials/navbar/navbar.component';
import { ActionModalComponent } from './modals/action-modal/action-modal.component';

// Full Calendar
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormModalComponent } from './modals/form-modal/form-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroScreenComponent,
    HomeScreenComponent,
    RegistroContactoPersonalScreenComponent,
    NavbarComponent,
    DirectorioPersonalScreenComponent,
    ActionModalComponent,
    RegistroContactoEmpresarialScreenComponent,
    DirectorioEmpresarialScreenComponent,
    AgendaScreenComponent,
    FormModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
