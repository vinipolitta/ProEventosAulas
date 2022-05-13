import { ValidatorField } from './../../../helpers/validator-field';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public form :FormGroup

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
      primeiroNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      ultimoNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      senha:  ['',[Validators.required, Validators.minLength(4)]],
      confSenha: ['',[Validators.required, Validators.minLength(4)]],
      // termosUsuario: ['',Validators.required],
    },formOptions);
  }
}
