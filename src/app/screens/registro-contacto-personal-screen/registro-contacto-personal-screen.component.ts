import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
  public contactModel: Number=1;
  public idContact: Number=0;
  public edit: boolean = false;

  //Errores
  public errors:any ={};

  constructor(
    private location: Location,
    private contactService: ContactService,
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contact = this.contactService.esquemaContactoPersonal();
    console.log("Contact: ", this.contact);

    //Valida si Existe un Parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      // Activa la Bandera para edit
      this.edit = true;
      // Asigna el Valor del ID en URL
      this.idContact = this.activatedRoute.snapshot.params['id'];
      console.log("ID Contact: ", this.idContact);
      // Al Iniciar la Vista Obtiene el Contacto por su ID
      this.getRegistroContactoPersonal();
    }
  }

  // Obtener Contacto Personal por ID
  public getRegistroContactoPersonal(){
    this.apiService.getRegistroContactoPersonal(this.idContact).subscribe({
      next:(response)=>{
        this.contact = response;
        console.log("Datos Contacto: ", this.contact);
      },
      error: (error)=>{
        alert("No se pudieron obtener los datos del usuario para editar");
      }
    });
  }

  regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    console.log("Contact: ", this.contact);
    this.errors = this.contactService.validateContact(this.contact, this.contactModel)

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

  public actualizar(){
    // Validar
    this.errors = [];

    console.log("Contact: ", this.contact);

    this.errors = this.contactService.validateContact(this.contact, this.contactModel)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    //Actualizar
    this.apiService.actualizarContactoPersonal(this.contact).subscribe({
      next: (response) => {
        alert("Usuario actualizado correctamente");
        console.log("Usuario actualizado: ", response);
        this.router.navigate(["/"]);
      },
      error: (error) => {
        alert("¡Error!: No se Pudo Actualizar Usuario");
      }
    });
  };

}

