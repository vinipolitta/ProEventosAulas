import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/Services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public widthImg = 150;
  public marginImg = 2;
  public showImage = false;
  private _filterList = '';

  modalRef?: BsModalRef;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getEventos();

  }
  public get filterList(): string {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltrados = this.filterList
      ? this.filterEvents(this.filterList)
      : this.eventos;
    console.log(
      this.filterList ? this.filterEvents(this.filterList) : this.eventos
    );
  }

  public filterEvents(filters: string): Evento[] {
    filters = filters.toLocaleLowerCase();
    return this.eventos.filter(
      (event: any) =>
        event.tema.toLocaleLowerCase().indexOf(filters) !== -1 ||
        event.local.toLocaleLowerCase().indexOf(filters) !== -1
    );
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error("Erro ao carregar eventos", 'ERROR!')
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O evento deletado com sucesso', 'Deletado');
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
