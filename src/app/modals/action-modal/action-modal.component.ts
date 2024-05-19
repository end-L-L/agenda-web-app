import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})

export class ActionModalComponent implements OnInit{
  
  public action:string = ""; // Editar - Eliminar
  public opc:number = 0;
  public field_1:string = "";
  public field_2:string = "";

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<ActionModalComponent>,
    private router: Router,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.action = this.data.action;
    this.opc = this.data.opc;

    this.dataActions();
  }

  dataActions(){
    if(this.action == "editar"){
      this.field_1 = "Editar";
    }

    if(this.action == "eliminar"){
      this.field_1 = "Eliminar";
    }

    if(this.opc == 1){
      this.field_2 = "Contacto Personal";
    }

    if(this.opc == 2){
      this.field_2 = "Contacto Empresarial";
    }
  }

  public closeModal(){
    if(this.data.action == "editar"){
      this.dialogRef.close({isEdit:false});
    }
    
    if(this.data.action == "eliminar"){
      this.dialogRef.close({isDelete:false});
    }
  }

  public actionModal(){
    if(this.opc == 1){
      if(this.action == "editar"){
        this.router.navigate(["registro-contacto-personal/"+this.data.id]);
        this.dialogRef.close({isEdit:true});
      }

      if(this.action == "eliminar"){
        this.apiService.eliminarContactoPersonal(this.data.id).subscribe({
          next: (response: any)=>{
            this.dialogRef.close({isDelete:true});
          },
          error: (error: any)=>{
            this.dialogRef.close({isDelete:false});
          }
        });
      }
    }
    
    if(this.opc == 2){
      if(this.action == "editar"){
        this.router.navigate(["registro-contacto-empresarial/"+this.data.id]);
        this.dialogRef.close({isEdit:true});
      }

      if(this.action == "eliminar"){
        this.apiService.eliminarContactoEmpresarial(this.data.id).subscribe({
          next: (response: any)=>{
            this.dialogRef.close({isDelete:true});
          },
          error: (error: any)=>{
            this.dialogRef.close({isDelete:false});
          }
        });
      }
    }
  }
}
