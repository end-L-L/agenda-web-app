import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FacadeService } from 'src/app/services/facade.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})

export class HomeScreenComponent implements OnInit{

  public user:any = {};

  public idUser:number=0;

  // Errores
  public errors:any ={};

  constructor(
    private facadeService: FacadeService,
    private apiService: ApiService,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.user = this.userService.esquemaUser();
    this.idUser = parseInt(this.facadeService.getUserId());
    console.log(this.idUser);
    console.log("User: ", this.user);
    this.getPerfilUsuario();

  }

  // Obtener Contacto Personal por ID
  public getPerfilUsuario(){
    this.apiService.getPerfilUsuario(this.idUser).subscribe({
      next:(response)=>{
        this.user = response;
        this.user.first_name = response.user.first_name;
        this.user.last_name = response.user.last_name;
        this.user.email = response.user.email;
        console.log("Datos Contacto: ", this.user);
      },
      error: (error)=>{
        alert("No se pudieron obtener los datos del usuario para editar");
      }
    });
  }
}
