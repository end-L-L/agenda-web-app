import { Injectable } from '@angular/core';

// Servicio de Validación
import { ValidatorService } from './tools/validator.service';

// Servicio de Errores
import { ErrorsService } from './tools/errors.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  public esquemaUser(){
    return {
      'identifier': '',
      'fist_name': '',
      'last_name': '',
      'start_time': '',
      'end_time': '',
      'job': '',
      'email': '',
      'password1': '',
      'password2': ''
    }
  }

  public validateUser(data: any){
    let error: any = [];

    // Validar ID
    if(!this.validatorService.required(data["identifier"])){
      error["identifier"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["identifier"])){
      error["identifier"] = this.errorService.numeric;
    }

    // Validar Nombre
    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }
    
    // Validar Apwllidos
    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    // Validar Hora Entrada
    if(!this.validatorService.required(data["start_time"])){
      error["start_time"] = this.errorService.required;
    } else if (!this.validatorService.time(data["start_time"])) {
      error["start_time"] = this.errorService.time;
    }

    // Validar Hora Salida
    if(!this.validatorService.required(data["end_time"])){
      error["end_time"] = this.errorService.required;
    } else if (!this.validatorService.time(data["end_time"])) {
      error["end_time"] = this.errorService.time;
    }

    // Validar Puesto
    if(!this.validatorService.required(data["job"])){
      error["job"] = this.errorService.required;
    }

    // Validar Email
    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    // Validar Contraseña
    if(!this.validatorService.required(data["password1"])){
      error["password1"] = this.errorService.required;
    }
    if(!this.validatorService.required(data["password2"])){
      error["password2"] = this.errorService.required;
    }
    
    //Return arreglo
    return error;
  }

}