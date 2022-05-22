import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Evento } from '../models/evento';

@Injectable()
// {providedIn: 'root'}
export class EventoService {
  constructor(private http: HttpClient) {}
  public URL = environment.apiURL + 'api/Eventos';
  tokenHeader = new HttpHeaders({'Authorization': `Bearer ${JSON.parse( localStorage.getItem('user')).token}`})

  public getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.URL, {headers: this.tokenHeader}).pipe(take(1));
  }

  public getEventosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.URL}/${tema}`).pipe(take(1));
  }

  public getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.URL}/${id}`).pipe(take(1));
  }

  public post(evento: any): Observable<any> {
    return this.http.post<any>(this.URL, evento).pipe(take(1));
  }

  public put(evento: any): Observable<Evento> {
    return this.http
      .put<Evento>(`${this.URL}/${evento.id}`, evento)
      .pipe(take(1));
  }
  public deleteEventos(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`).pipe(take(1));
  }

  public postUpload(eventoId: number, file: File): Observable<Evento> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<Evento>(`${this.URL}/upload-image/${eventoId}`, formData)
      .pipe(take(1));
  }
}
