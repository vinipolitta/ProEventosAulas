import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  eventosFiltrados: any = [];
  public URL = "https://localhost:5001/api/";
  widthImg = 150;
  marginImg = 2;
  showImage = false;
  private _filterList = '';

  public get filterList(): string {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltrados = this.filterList ? this.filterEvents(this.filterList) : this.eventos;
    console.log(this.filterList ? this.filterEvents(this.filterList) : this.eventos);

  }

  constructor(private http: HttpClient)
  { }

  ngOnInit(): void {
    this.getEventos();
  }

  public filterEvents(filters: string): any {
    filters = filters.toLocaleLowerCase();
    return this.eventos.filter(
      (event: any) => event.tema.toLocaleLowerCase().indexOf(filters) !== -1 ||
      event.local.toLocaleLowerCase().indexOf(filters) !== -1
    );
  }

  public getEventos(): void {
    this.http.get(`${this.URL +"Eventos"}`).subscribe(res =>{
      this.eventos = res;
      this.eventosFiltrados = this.eventos;
    },
      error =>   console.log(error)
    );
  }
}
