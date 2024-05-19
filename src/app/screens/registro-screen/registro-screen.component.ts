import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Servicios de Validación
import { UserService } from 'src/app/services/user.service';

// Servicios API
import { ApiService } from 'src/app/services/api.service';


// JQuery
declare var $: any;

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit{

  //Propiedades
  public user: any = {};
  public idUser: Number=0;
  
  //Contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  
  //Errores
  public errors:any ={};

  constructor(
    private location: Location,
    private userService: UserService,
    private apiService: ApiService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.user = this.userService.esquemaUser();
  }

  //Funciones para Password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.userService.validateUser(this.user)

    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    //Valida la contraseña
    if(this.user.password1 == this.user.password2){
      //Funcion para registrarse
      alert("Todo OK, Registrando Usuario...");

      this.apiService.registrarUsuario(this.user).subscribe({
        next: (response) => {
          alert("Usuario registrado correctamente");
          this.router.navigate(["/"]);
        },
        error: (error) => {
          alert("¡Error!: No se Pudo Registrar Usuario");
        }
      });

    }else{
      alert("Las contraseñas no coinciden");
      this.user.password1="";
      this.user.password2="";
    }
  }
}
