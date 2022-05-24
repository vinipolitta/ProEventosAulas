import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResult } from '@app/models/pagination';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Evento } from '../models/evento';

@Injectable()
// {providedIn: 'root'}
export class EventoService {
  constructor(private http: HttpClient) {}
  public URL = environment.apiURL + 'api/Eventos';

  public getEventos(
    page?: number,
    itemsPerPage?: number
  ): Observable<PaginatedResult<Evento[]>> {
    const paginatedResult: PaginatedResult<Evento[]> = new PaginatedResult<
      Evento[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http
      .get<Evento[]>(this.URL, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {

          paginatedResult.result = response.body;
          if (response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
            console.log(paginatedResult.pagination);

          }
          return paginatedResult;
        })
      );
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
