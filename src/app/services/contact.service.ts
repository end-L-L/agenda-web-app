import { Injectable } from '@angular/core';

// Servicio de Validación
import { ValidatorService } from './tools/validator.service';

// Servicio de Errores
import { ErrorsService } from './tools/errors.service';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
  ) { }

  public esquemaContactoPersonal(){
    return {
      'name': '',
      'address': '',
      'cp': '',
      'email': '',
      'phone_1': '',
      'phone_2': '',
      'relationship': '',
    }
  }

  public esquemaContactoEmpresarial(){
    return {
      'name': '',
      'sector': '',
      'address': '',
      'cp': '',
      'legal_representative': '',
      'phone_1': '',
      'email': '',
    }
  }

  public validateContact(data: any, idContact: Number){
    // Variable para Errores
    let error: any = [];

    // Validar Nombre
    if(!this.validatorService.required(data["name"])){
      error["name"] = this.errorService.required;
    }

    // Validar Dirección
    if(!this.validatorService.required(data["address"])){
      error["address"] = this.errorService.required;
    }

    // Validar Código Postal
    if(!this.validatorService.required(data["cp"])){
      error["cp"] = this.errorService.required;
    } else if (!this.validatorService.numeric(data["cp"])) {
      error["cp"] = this.errorService.numeric;
    }

    // Validar Email
    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }
    
    // Validar Telefono 1
    if(!this.validatorService.required(data["phone_1"])){
      error["phone_1"] = this.errorService.required;
    } else if (!this.validatorService.numeric(data["phone_1"])) {
      error["phone_1"] = this.errorService.numeric;
    }

    if(idContact == 1){
        // Validar Telefono 2
      if(!this.validatorService.required(data["phone_2"])){
        error["phone_2"] = this.errorService.required;
      } else if (!this.validatorService.numeric(data["phone_2"])) {
        error["phone_2"] = this.errorService.numeric;
      }

      // Validar Relación
      if(!this.validatorService.required(data["relationship"])){
        error["relationship"] = this.errorService.required;
      }
    }
    
    if(idContact == 2){
      // Validar Sector
      if(!this.validatorService.required(data["sector"])){
        error["sector"] = this.errorService.required;
      }

      // Validar Representante Legal
      if(!this.validatorService.required(data["legal_representative"])){
        error["legal_representative"] = this.errorService.required;
      }
    }

    // Return arreglo
    return error;
  }
}
