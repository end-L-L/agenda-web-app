import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Servicios de Validación
import { ContactService } from 'src/app/services/contact.service';

// Servicios API
import { ApiService } from 'src/app/services/api.service';

// JQuery
declare var $: any;

@Component({
  selector: 'app-registro-contacto-personal-screen',
  templateUrl: './registro-contacto-personal-screen.component.html',
  styleUrls: ['./registro-contacto-personal-screen.component.scss']
})
export class RegistroContactoPersonalScreenComponent implements OnInit{

  //Propiedades
  public contact: any = {};
  public idContact: Number=1;
  
  //Errores
  public errors:any ={};

  constructor(
    private location: Location,
    private contactService: ContactService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contact = this.contactService.esquemaContactoPersonal();
    console.log("Contact: ", this.contact);
  }

  regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];
    
    console.log("Contact: ", this.contact);
    this.errors = this.contactService.validateContact(this.contact, this.idContact)
    
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    //Registrar
    this.apiService.registrarContactoPersonal(this.contact).subscribe({
      next: (response) => {
        alert("Usuario registrado correctamente");
        console.log("Usuario registrado: ", response);
        this.router.navigate(["/"]);
      },
      error: (error) => {
        alert("¡Error!: No se Pudo Registrar Usuario");
      }
    });
  }
}

