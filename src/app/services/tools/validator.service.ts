import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  // Funciones para Validar

  // Campo Requerido
  required(input:any){
    return (input != undefined && input != null && input != "" && input.toString().trim().length > 0);
  }

  // Validar Email
  email(input:any){
    var regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return input.match(regEx); // Invalid format
  }

  // Validar Longitud
  max(input:any, size:any){
    return (input.length <= size);
  }

  // Validar 00:00
  time(value: string): boolean {
    // Expresión regular para validar el formato de tiempo 24 horas (HH:mm)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(value);
  }

  // Validar Número
  numeric(input:any){
    return (!isNaN(parseFloat(input)) && isFinite(input));
  }
   
}