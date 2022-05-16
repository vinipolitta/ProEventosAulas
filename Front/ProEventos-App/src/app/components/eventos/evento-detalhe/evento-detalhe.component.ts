import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from './../../../Services/evento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Evento } from '@app/models/evento';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {
  public form: FormGroup;
  public evento = {} as Evento;
  estadoSalvar = 'post' as string;

  get f(): any {
    return this.form.controls
  }

  get bsConfig(): any {
    return {
      containerClass: 'theme-blue',
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY, h:mm a',
      showWeekNumbers: false
    }
  }

  constructor(
    private fb : FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService : EventoService,
    private spinner: NgxSpinnerService,
    private toaster : ToastrService) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
    this.carregarEvento();

  }

  public validation () {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento :['', Validators.required],
      qtdPessoas: ['',[Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: [''],
    });

  }

  public resetForm() {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl) {
   return {'is-invalid':campoForm.errors && campoForm.touched}
  }

  public carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');
    if (eventoIdParam !== null ) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = {...evento};
          this.form.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          this.toaster.error('Erro ao tentar carregar eventos', 'Erro!!!')
          console.error(error);
        },
        () => this.spinner.hide(),
      );
    }
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {

      this.evento = (this.estadoSalvar === 'post')
        ? {...this.form.value}
        : {id: this.evento.id,...this.form.value}

      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        () => {this.toaster.success('Evento salvo com sucesso', 'Sucesso!!!')
        console.log(this.evento);
      },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toaster.error("Erro ao salvar o evento", 'Error!!!')
        },
        () => this.spinner.hide(),
      );
    }
  }
}
