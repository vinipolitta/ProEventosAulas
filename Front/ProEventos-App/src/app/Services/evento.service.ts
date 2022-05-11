import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable(
  // {providedIn: 'root'}
)
export class EventoService {

  constructor(private http: HttpClient) { }
  public URL = "https://localhost:5001/api/";


  public getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.URL +"Eventos"}`);
  }

  public getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.URL +"Eventos"}/${tema}`);
  }

  public getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.URL +"Eventos"}/${id}`);
  }
}
