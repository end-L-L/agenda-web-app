import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }

  /* Servicios HTTP */

  // Perfiles Principales

  // Registar Usuario
  public registrarUsuario (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/register/`, data, httpOptions);
  }

  // Obtener Perfil de Usuario
  public getPerfilUsuario(idUser: Number){
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/profile/?id=${idUser}`, {headers:headers});
  }

  // Contactos Personales

  // Registar Contacto Personal
  public registrarContactoPersonal (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/register-personal-contact/`, data, httpOptions);
  }

  // Obtener Datos de Contacto Personal por ID
  public getRegistroContactoPersonal(idContact: Number){
    return this.http.get<any>(`${environment.url_api}/register-personal-contact/?id=${idContact}`,httpOptions);
  }

  // Actualizar Contacto
  public actualizarContactoPersonal (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/edit-personal-contact/`, data, {headers:headers});
  }
}
