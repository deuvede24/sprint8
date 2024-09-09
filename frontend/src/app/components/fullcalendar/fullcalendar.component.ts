/*import { Component } from '@angular/core';

@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  imports: [],
  templateUrl: './fullcalendar.component.html',
  styleUrl: './fullcalendar.component.scss'
})
export class FullcalendarComponent {

}*/
import { Component, AfterViewInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarComponent as AngularFullCalendar } from '@fullcalendar/angular'; // Asegúrate de importar FullCalendar
import { ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../../services/event.service'; // Servicio para los eventos
import { CalendarEvent } from '../../interfaces/event.interface'; // Interfaz para los eventos

@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.scss'],
  imports: [FullCalendarModule, ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule
  providers: [EventService], // Inyecta el servicio de eventos
})
export class FullCalendarComponent implements AfterViewInit {
  calendarOptions: CalendarOptions;
  eventForm: FormGroup;
  addModal = false;
  selectedEvent: CalendarEvent | null = null;

  @ViewChild('fullcalendar') calendarComponent!: AngularFullCalendar; // Aquí se obtiene la referencia del calendario


  private eventService = inject(EventService); // Inyecta el servicio
  private fb = inject(FormBuilder);

  constructor() {
    // Definición de las opciones del calendario, sin uso de `bind`
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      selectable: true,
      dateClick: this.handleDateClick,
      eventClick: this.handleEventClick,
      events: [], // Eventos serán cargados al inicializar
    };

    // Definición del formulario reactivo para los eventos
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: [''],
    });
  }

  ngAfterViewInit(): void {
    this.loadEvents(); // Cargar los eventos después de la vista inicializada
  }

  // Cargar los eventos desde el servicio
  loadEvents(): void {
    this.eventService.getEvents().subscribe((events: CalendarEvent[]) => {
      console.log('Eventos cargados:', events);  // Añade esta línea
    
      // FullCalendar requiere que el 'id' de los eventos sea de tipo string
      this.calendarOptions.events = events.map((event) => ({
        id: event.id.toString(),  // Convertimos el 'id' a string
        title: event.title,
        start: event.date, // Asegúrate de que la fecha sea válida
        description: event.description,
      }));
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.refetchEvents(); // Refresca eventos una vez cargados
    });
  }

  // Manejar el clic en una fecha del calendario
  handleDateClick = (info: any): void => {
    this.addModal = true;
    this.eventForm.reset();
    this.eventForm.patchValue({ date: info.dateStr });
  };

  // Manejar el clic en un evento del calendario
  handleEventClick = (info: any): void => {
    this.addModal = true;
    this.selectedEvent = info.event;
    this.eventForm.patchValue({
      title: info.event.title,
      date: info.event.startStr,
      description: info.event.extendedProps.description || '',
    });
  };

  // Guardar o actualizar el evento
  saveEvent(): void {
    if (this.eventForm.valid) {
      const newEvent = this.eventForm.value;
      if (this.selectedEvent) {
        // Actualizar un evento existente
        this.eventService.updateEvent(this.selectedEvent.id, newEvent).subscribe(() => {
          this.loadEvents();
        });
      } else {
        // Crear un nuevo evento
        this.eventService.createEvent(newEvent).subscribe(() => {
          this.loadEvents();
        });
      }
      this.addModal = false;
    }
  }

  // Resetear el formulario
  resetForm(): void {
    this.addModal = false;
    this.selectedEvent = null;
    this.eventForm.reset();
  }
}

