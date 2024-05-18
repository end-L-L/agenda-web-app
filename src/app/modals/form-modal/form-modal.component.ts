import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgendaService } from 'src/app/services/agenda.service';
import { ApiService } from 'src/app/services/api.service';

// jquery
declare var $: any;

interface Contact {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})

export class FormModalComponent implements OnInit {

  // propiedades
  public task: any = {};
  public copyTask: any = {};

  // errores
  public errors: any = {};

  // socios
  public socios: Contact[] = [];

  // contactos combinados
  public unionContactos: string[] = [];

  ngOnInit(): void {
    this.task = this.agendaService.esquemaTask();
    this.task.date = this.data.info.startStr;
    this.obtenerContactos();
  }

  constructor(
    private apiService: ApiService,
    private agendaService: AgendaService,
    private dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public onSave() {
    // validación
    this.errors = [];

    this.errors = this.agendaService.validateTask(this.task);

    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    // transformamos los datos en el formato adecuado
    this.copyTask = { ...this.task };
    this.copyTask.start = this.task.date + "T" + this.task.start + ":00";
    this.copyTask.end = this.task.date + "T" + this.task.end + ":00";

    this.apiService.guardarEvento(this.copyTask).subscribe({
      next: (response: any) => {
        this.dialogRef.close(this.task);
      },
      error: () => {
        alert("¡error al guardar tarea!");
      }
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  // obtener contactos personales
  public obtenerContactos() {
    this.apiService.obtenerContactos().subscribe({
      next: (response: any) => {
        this.unionContactos = [...response.personal_contacts, ...response.business_contacts];
        this.socios = this.transformContacts(this.unionContactos);
      },
      error: () => {
        alert("¡error al obtener contactos!");
      }
    });
  }

  // función para transformar el arreglo de contactos
  public transformContacts(contacts: string[]): Contact[] {
    return contacts.map((contact, index) => ({
      value: `${index + 1}`,
      viewValue: contact
    }));
  }

}
