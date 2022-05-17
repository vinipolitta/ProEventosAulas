import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoteService } from './../../../Services/lote.service';
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from './../../../Services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Evento } from '@app/models/evento';
import { Lote } from '@app/models/lote';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  public form: FormGroup;
  public evento = {} as Evento;
  estadoSalvar = 'post' as string;
  eventoId: number;
  modalRef: BsModalRef;
  loteAtual = { id: 0, nome: '', indice: 0 };

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      containerClass: 'theme-blue',
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY, h:mm a',
      showWeekNumbers: false,
    };
  }

  get bsConfigLote(): any {
    return {
      containerClass: 'theme-blue',
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      showWeekNumbers: false,
    };
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activetedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private loteService: LoteService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
  }

  public validation() {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: [''],
      lotes: this.fb.array([]),
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({ id: 0 } as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      preco: [lote.preco, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
    });
  }

  public resetForm() {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public carregarEvento(): void {
    this.eventoId = +this.activetedRouter.snapshot.paramMap.get('id');
    if (this.eventoId !== null && this.eventoId !== 0) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService
        .getEventoById(this.eventoId)
        .subscribe(
          (evento: Evento) => {
            this.evento = { ...evento };
            this.form.patchValue(this.evento);
            this.evento.lotes.forEach((lote) => {
              this.lotes.push(this.criarLote(lote));
            });
            // this.carregarLotes();
          },
          (error: any) => {
            this.toaster.error('Erro ao tentar carregar eventos', 'Erro!!!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  // carregarLotes(): void {
  //   this.loteService.getLotesByEventoId(this.eventoId).subscribe(
  //     (lotesRetorno: Lote[]) => {
  //       lotesRetorno.forEach(lote => {this.lotes.push(this.criarLote(lote))})
  //     },
  //     (error: any) => {
  //       this.toaster.error('Erro ao tentar carregar lotes', 'Erro!!!');
  //       console.error(error);

  //     },
  //   ).add(() => this.spinner.hide());
  // }

  public salvarAlteracao(): void {
    if (this.form.valid) {
      this.spinner.show();
      this.evento =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.evento.id, ...this.form.value };

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        (eventoRetorno: Evento) => {
          this.toaster.success('Evento salvo com sucesso', 'Sucesso!!!');
          this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toaster.error('Erro ao salvar o evento', 'Error!!!');
        },
        () => this.spinner.hide()
      );
    }
  }

  public salvarLotes() {
    this.spinner.show();

    if (this.form.controls['lotes'].valid) {
      this.loteService
        .saveLote(this.eventoId, this.form.value.lotes)
        .subscribe(
          () => {
            this.toaster.success('Lotes salvos com sucesso!', 'Sucesso!!');
          },
          (error: any) => {
            this.toaster.error('Erro ao tentar salvar lotes.', 'Erro!!!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  removerLote(indice: number, template: TemplateRef<any>): void {
    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.lotes.removeAt(indice);
  }

  confirm() {
    this.modalRef.hide();
    this.spinner.show();
    this.loteService
      .deleteLote(this.eventoId, this.loteAtual.id)
      .subscribe(
        () => {
          this.toaster.success(
            `Lote ${this.loteAtual.nome} deletado com sucesso`,
            'Sucesso!!!'
          );
          this.lotes.removeAt(this.loteAtual.indice);
        },
        (error: any) => {
          this.toaster.error(
            `Erro ao excluir lote ${this.loteAtual.nome}`,
            'Error!!!'
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef?.hide();
  }

  retornaTituloLote(nome: string): string {
    return nome === null || nome === '' ? 'Nome do Lote' : nome;
  }
}
