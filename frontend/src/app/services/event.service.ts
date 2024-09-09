import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../interfaces/event.interface';  // Cambia por la ruta correcta

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private apiUrl = 'http://localhost:3000/events';  // Asegúrate de que coincida con tu endpoint en backend

    constructor(private http: HttpClient) { }

    getEvents(): Observable<CalendarEvent[]> {
        return this.http.get<CalendarEvent[]>(this.apiUrl);
    }

    createEvent(newEvent: CalendarEvent): Observable<CalendarEvent> {
        return this.http.post<CalendarEvent>(`${this.apiUrl}/events`, newEvent);
    }


    addEvent(event: CalendarEvent): Observable<CalendarEvent> {
        return this.http.post<CalendarEvent>(this.apiUrl, event);
    }

    updateEvent(id: number, updatedEvent: CalendarEvent): Observable<CalendarEvent> {
        return this.http.put<CalendarEvent>(`${this.apiUrl}/events/${id}`, updatedEvent);
      }

    deleteEvent(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}

