import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

  constructor(
    private router: Router,
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {
  }

  public logout(){
    this.facadeService.logout().subscribe({
      next: () => {
        // Elimina el Token de la Sesión
        this.facadeService.destroyUser();
        // Navega al Login
        this.router.navigate(["/"]);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
