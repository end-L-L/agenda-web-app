import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios de Validación
import { ContactService } from 'src/app/services/contact.service';

// Servicios API
import { ApiService } from 'src/app/services/api.service';
import { FacadeService } from 'src/app/services/facade.service';

// JQuery
declare var $: any;

@Component({
  selector: 'app-registro-contacto-empresarial-screen',
  templateUrl: './registro-contacto-empresarial-screen.component.html',
  styleUrls: ['./registro-contacto-empresarial-screen.component.scss']
})

export class RegistroContactoEmpresarialScreenComponent implements OnInit{

  // Propiedades
  public contact: any = {};
  public contactModel: Number=2;
  public idContact: Number=0;
  public edit: boolean = false;
  public token: string = "";

  // Errores
  public errors:any ={};

  constructor(
    private location: Location,
    private contactService: ContactService,
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private facadeService: FacadeService
  ) {}

  ngOnInit(): void {
    // Validar Token
    this.token = this.facadeService.getSessionToken();
    if(this.token == ""){
      this.router.navigate([""]);
    }else{
      this.contact = this.contactService.esquemaContactoEmpresarial();

      //Valida si Existe un Parámetro en la URL
      if(this.activatedRoute.snapshot.params['id'] != undefined){
        // Activa la Bandera para edit
        this.edit = true;
        // Asigna el Valor del ID en URL
        this.idContact = this.activatedRoute.snapshot.params['id'];
        
        // Al Iniciar la Vista Obtiene el Contacto por su ID
        this.getRegistroContactoEmpresarial();
      }
    } 
  }

  regresar(){
    this.location.back();
  }

  // Registrar Contacto Empresarial
  registrar(){
    // Validar
    this.errors = [];

    this.errors = this.contactService.validateContact(this.contact, this.contactModel)

    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    
    this.apiService.registrarContactoEmpresarial(this.contact).subscribe({
      next: (response) => {
        alert("Contacto Registrado Correctamente");
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        alert("¡Error!: No se Pudo Registrar Contacto");
      }
    });
  }

  actualizar(){
    // Validar
    this.errors = [];

    this.errors = this.contactService.validateContact(this.contact, this.contactModel)

    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    // Actualizar Contacto Empresarial
    this.apiService.actualizarContactoEmpresarial(this.contact).subscribe({
      next: (response) => {
        alert("Contacto Actualizado Correctamente");
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        alert("¡Error!: No se Pudo Actualizar Contacto");
      }
    });
  }

  getRegistroContactoEmpresarial(){
    this.apiService.getRegistroContactoEmpresarial(this.idContact).subscribe({
      next:(response)=>{
        this.contact = response;
      },
      error: (error)=>{
        alert("¡Error!: Datos del Contacto no Obtenidos");
      }
    });
  }
}
