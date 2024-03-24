import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  public generic: string;
  public required: string;
  public email: string;
  public time: string;
  public numeric: string;

  constructor() { 
    this.generic = 'Favor de verificar el tipo de dato introducido no es válido';
    this.required = 'Campo requerido';
    this.email = 'Favor de introducir un correo con el formato correcto';
    this.time = 'Favor de introducir un tiempo válido en formato 24 horas (HH:mm)';
    this.numeric = 'Favor de introducir un valor numérico';
  }

  max(size: any) {
    return 'Se excedió la longitud del campo aceptada: ' + size;
  }
}