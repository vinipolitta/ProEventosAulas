import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '@app/models/lote';
import { Observable, take } from 'rxjs';

@Injectable(
  // { providedIn: 'root'}
)
export class LoteService {

  constructor(private http: HttpClient) { }
  public URL = "https://localhost:5001/api/Lotes";

  public getLotesByEventoId(eventoId: number): Observable<Lote[]> {
    return this.http
               .get<Lote[]>(`${this.URL}/${eventoId}`)
               .pipe(take(1));
  }

  public saveLote(eventoId: number, loteId: Lote[]): Observable<Lote[]> {
    return this.http
               .put<Lote[]>(`${this.URL}/${eventoId}`, loteId)
               .pipe(take(1));
  }
  public deleteLote(eventoId: number, loteId: number): Observable<any> {
    return this.http
              .delete(`${this.URL}/${eventoId}/${loteId}`)
              .pipe(take(1));
  }
}
