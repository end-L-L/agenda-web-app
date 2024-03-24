import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios de Fachada
import { FacadeService } from 'src/app/services/facade.service';

//JQuery
declare var $: any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit{

  public type: String = "password";
  public username: String = "";
  public password: String = "";

  public errors:any = {};

  constructor(
    private facadeService: FacadeService,
    private router: Router
  ) {}

  ngOnInit():void{
  
  }

  public login(){
    //Validar
    this.errors = [];
    
    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
  }

  public showPassword(){
    if(this.type == "password"){
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    }else if(this.type == "text"){
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }
  }

  public goRegistro(){
    this.router.navigate(["registro-usuario"]);
  }
}
