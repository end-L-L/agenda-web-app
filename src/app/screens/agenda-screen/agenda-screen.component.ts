import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FacadeService } from 'src/app/services/facade.service';

// Full Calendar
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { INITIAL_EVENTS, createEventId } from './event-utils';

// Modal
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from 'src/app/modals/form-modal/form-modal.component';

@Component({
  selector: 'app-agenda-screen',
  templateUrl: './agenda-screen.component.html',
  styleUrls: ['./agenda-screen.component.scss']
})

export class AgendaScreenComponent implements OnInit {

  // eventos
  public apiEvents: any = [];

  // id del evento
  public idEvent: number = 0;

  // Login Token
  public token:string = "";

  constructor(
    private facadeService: FacadeService,
    private apiService: ApiService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Login Token
    this.token = this.facadeService.getSessionToken();

    // No Token, Login
    if(this.token == ""){
      this.router.navigate([""]);
    } else {
      this.obtenerEventos();
      this.loadEvents();
    }
  }

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    //initialEvents: INITIAL_EVENTS,
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    locale: esLocale,
  });
  
  //currentEvents = signal<EventApi[]>([]);

  loadEvents() {
    this.apiService.obtenerEventos().subscribe(events => {
      this.calendarOptions.mutate(options => {
        options.events = events;
        options.selectable = true;
      });
    });
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {

    const dialogRef = this.dialog.open(FormModalComponent, {
      data: { info: selectInfo },
      height: '800px',
      width: '440px',
    });

    const calendarApi = selectInfo.view.calendar;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        calendarApi.addEvent({
          id: createEventId(),
          title: result.title,
          start: result.date + 'T' + result.start,
          end: result.date + 'T' + result.end,
          allDay: false,
        });
      }
      window.location.reload();
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.idEvent = Number(clickInfo.event._def.publicId);
    console.log(clickInfo.event._def.publicId);
    if (confirm(`¿Desea Eliminar el Evento '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
      this.apiService.eliminarEvento(this.idEvent).subscribe({
        next: (response: any) => {
          window.location.reload();
        },
        error: () => {
          alert("¡error al eliminar evento!");
        }
      });
    }
  }

  handleEvents(events: EventApi[]) {
    //this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }

  // obtener lista de eventos
  public obtenerEventos() {
    this.apiService.obtenerEventos().subscribe({
      next: (response: any) => {
        this.apiEvents = response;
        //console.log("Eventos: ", this.apiEvents);
      },
      error: () => {
        alert("¡error al obtener eventos!");
      }
    });
  }

  getFormattedDate(dateString: string): string {
    return dateString.split('T')[0];
  }

  getFormattedTime(timeString: string): string {
    return timeString.split('T')[1].split(':')[0] + ':' + timeString.split('T')[1].split(':')[1];
  }
}
