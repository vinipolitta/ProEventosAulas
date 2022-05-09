import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any;
  public URL = "https://localhost:5001/api/"

  constructor(private http: HttpClient)
  { }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void {
    this.http.get(`${this.URL +"Eventos"}`).subscribe(res =>
      this.eventos = res,
      error =>   console.log(error)

    )
  }

}
