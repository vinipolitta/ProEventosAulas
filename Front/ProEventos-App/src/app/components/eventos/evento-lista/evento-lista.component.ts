import { PaginatedResult } from '@app/models/pagination';
import { Pagination } from './../../../models/pagination';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '@app/models/evento';
import { EventoService } from '@app/Services/evento.service';
import { environment } from '@environments/environment';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss'],
})
export class EventoListaComponent implements OnInit {
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public widthImg = 150;
  public marginImg = 2;
  public showImage = false;
  public pagination = {} as Pagination;
  private _filterList = '';
  modalRef?: BsModalRef;
  eventoId: number;


  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    } as Pagination;
    this.carregarEventos();
  }
  public get filterList(): string {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltrados = this.filterList
      ? this.filterEvents(this.filterList)
      : this.eventos;
  }

  public filterEvents(filters: string): Evento[] {
    filters = filters.toLocaleLowerCase();
    return this.eventos.filter(
      (event: any) =>
        event.tema.toLocaleLowerCase().indexOf(filters) !== -1 ||
        event.local.toLocaleLowerCase().indexOf(filters) !== -1
    );
  }

  // public carregarEventos(): void {
  //   this.spinner.show();

  //   this.eventoService
  //     .getEventos(this.pagination.currentPage, this.pagination.itemsPerPage)
  //     .subscribe(
  //       (paginatedResult: PaginatedResult<Evento[]>) => {
  //         if (paginatedResult) {
  //           this.eventos = paginatedResult.result;
  //           this.eventosFiltrados = this.eventos;
  //           this.pagination = paginatedResult.pagination;
  //           console.log('@@@@',this.pagination);

  //         }

  //       },
  //       (error) => {
  //         this.toastr.error('Erro ao carregar eventos', 'ERROR!');
  //         console.error(error);
  //       }
  //     )
  //     .add(() => this.spinner.hide());
  // }

  public carregarEventos(): void {
    this.spinner.show();

    this.eventoService
      .getEventos(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (paginatedResult: PaginatedResult<Evento[]>) => {
          this.eventos = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
          console.log(this.pagination );

        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar os Eventos', 'Erro!');
        }
      )
      .add(() => this.spinner.hide());
  }
  openModal(event: any, template: TemplateRef<any>, eventoId: number) {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService
      .deleteEventos(this.eventoId)
      .subscribe(
        (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              `O evento ${this.eventoId} deletado com sucesso`,
              'Deletado'
            );
            this.carregarEventos();
          }
        },
        (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o evento ${this.eventoId}`,
            'Erro!!!'
          );
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number) {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

  mostrarImagem(imgUrl: any): string {
    return imgUrl !== ''
      ? `${environment.apiURL}resources/images/${imgUrl}`
      : 'assets/img/img-not-found.png';
  }

  public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.carregarEventos();
  }
}
