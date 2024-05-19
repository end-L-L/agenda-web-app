import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActionModalComponent } from 'src/app/modals/action-modal/action-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { FacadeService } from 'src/app/services/facade.service';

@Component({
  selector: 'app-directorio-personal-screen',
  templateUrl: './directorio-personal-screen.component.html',
  styleUrls: ['./directorio-personal-screen.component.scss']
})

export class DirectorioPersonalScreenComponent implements OnInit{

  public username:string = "";
  public rol:string = "";
  public token:string = "";
  public lista_contactos:any[] = [];

  // Tabla de Datos de Contactos Personales
  displayedColumns: string[] = ['name', 'address', 'cp', 'email', 'phone_1', 'phone_2', 'relationship', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosContacto>(this.lista_contactos as DatosContacto[]);
 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private facadeService: FacadeService,
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Login Token
    this.token = this.facadeService.getSessionToken();

    // No Token, Login
    if(this.token == ""){
      this.router.navigate([""]);
    }else{
      this.username = this.facadeService.getUserCompleteName();
      this.rol = this.facadeService.getUserGroup();
      
      // Lista de Contactos
      this.obtenerContactos();
 
      // Paginador
      this.initPaginator();
    }
  }

  // Paginación
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      // Modificar Etiquetas del Paginador a Español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
  }

  // Obtener Contactos Personales
  public obtenerContactos(){
    this.apiService.obtenerContactosPersonales().subscribe({
      next: (response: any)=>{
        this.lista_contactos = response;
        this.dataSource = new MatTableDataSource<DatosContacto>(this.lista_contactos as DatosContacto[]);
        
      },
      error: ()=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    });
  }
  
  goEditar(idContact: number){
    const dialogRef = this.dialog.open(ActionModalComponent,{
      data: {id: idContact, action: "editar", opc: 1}, // Enviar Datos al Modal
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdit){
        window.location.reload();
      }
    });
  }

  goEliminar(idContact: number){
    const dialogRef = this.dialog.open(ActionModalComponent,{
      data: {id: idContact, action: "eliminar", opc: 1},
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        window.location.reload();
      }
    });
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  goRegistrarContacto(){
    this.router.navigate(['/registro-contacto-personal']);
  }
}


export interface DatosContacto {
  id: number,
  name: string,
  address: string,
  cp: number,
  email: string,
  phone_1: string,
  phone_2: string,
  relationship: string
}