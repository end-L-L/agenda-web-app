import { Injectable } from '@angular/core';

// Servicio de Validación
import { ValidatorService } from './tools/validator.service';

// Servicio de Errores
import { ErrorsService } from './tools/errors.service';

@Injectable({
  providedIn: 'root'
})

export class AgendaService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  public esquemaTask(){
    return {
      'title': '',
      'date': '',
      'start': '',
      'end': '',
      'parnter': '',
      'place': '',
      'description': ''
    }
  }

  public validateTask(data: any){
    let error: any = [];

    // Validar Título
    if(!this.validatorService.required(data["title"])){
      error["title"] = this.errorService.required;
    }

    // Validar Fecha
    if(!this.validatorService.required(data["date"])){
      error["date"] = this.errorService.required;
    }

    // Validar Hora de Inicio
    if(!this.validatorService.required(data["start"])){
      error["start"] = this.errorService.required;
    }

    // Validar Hora de Fin
    if(!this.validatorService.required(data["end"])){
      error["end"] = this.errorService.required;
    }

    // Validar Socio
    if(!this.validatorService.required(data["partner"])){
      error["partner"] = this.errorService.required;
    }

    // Validar Lugar
    if(!this.validatorService.required(data["place"])){
      error["place"] = this.errorService.required;
    }

    // Validar Descripción
    if(!this.validatorService.required(data["description"])){
      error["description"] = this.errorService.required;
    }
  
    return error;
  }
}
