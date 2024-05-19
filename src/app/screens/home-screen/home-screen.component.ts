import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FacadeService } from 'src/app/services/facade.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})

export class HomeScreenComponent implements OnInit{

  // usuario
  public user:any = {};
  // id usuario
  public idUser:number=0;
  // errores
  public errors:any ={};
  // login token
  public token:string = "";

  // eventos + paginator
  public apiEvents: any = [];
  public paginatedEvents: any[] = []; // array de eventos paginados
  public pageSize = 9; // número de eventos por página
  public pageIndex = 0; // indice de la página actual

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    // login token
    this.token = this.facadeService.getSessionToken();

    // no token, login
    if(this.token == ""){
      this.router.navigate([""]);
    } else {
      this.user = this.userService.esquemaUser();
      this.idUser = parseInt(this.facadeService.getUserId());
      this.getPerfilUsuario();
      this.getEventos();
    }
  }

  // obtener perfil de usuario
  public getPerfilUsuario(){
    this.apiService.getPerfilUsuario(this.idUser).subscribe({
      next:(response)=>{
        this.user = response;
        this.user.first_name = response.user.first_name;
        this.user.last_name = response.user.last_name;
        this.user.email = response.user.email;
      },
      error: (error)=>{
        alert("error al obtener los datos de usuario");
      }
    });
  }

  public getEventos(){
    this.apiService.obtenerEventos().subscribe({
      next:(response)=>{
        this.apiEvents = response;
        this.updatePaginatedEvents();
      },
      error: (error)=>{
        alert("error al obtener los eventos");
      }
    });
  }

  getFormattedDate(dateString: string): string {
    return dateString.split('T')[0];
  }

  getFormattedTime(timeString: string): string {
    return timeString.split('T')[1].split(':')[0] + ':' + timeString.split('T')[1].split(':')[1];
  }

  // mat-paginator
  updatePaginatedEvents() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = this.apiEvents.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedEvents();
  }
}
