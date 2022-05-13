import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidatorField } from '@app/helpers/validator-field';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public form: FormGroup;

  get f(): any {
    return this.form.controls
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario();
  }

  formulario() {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confSenha')
    }
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      ultimoNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.maxLength(15)]],
      funcao: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(250)]],
      senha:  ['',[Validators.required, Validators.minLength(4)]],
      confSenha: ['',[Validators.required, Validators.minLength(4)]],
    }, formOptions)
  }

  resetForm(event: any) {
    event.preventDefault();
    this.form.reset();
  }

}
