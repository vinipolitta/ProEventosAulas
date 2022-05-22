import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../../Services/account.service';
import { ValidatorField } from './../../../helpers/validator-field';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/identity/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  user = {} as User;
  public form: FormGroup;

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toater: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario();
  }

  formulario() {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confPassword'),
    };
    this.form = this.fb.group(
      {
        primeiroNome: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100),
          ],
        ],
        ultimoNome: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confPassword: ['', [Validators.required, Validators.minLength(4)]],
        // termosUsuario: ['',Validators.required],
      },
      formOptions
    );
  }

  register(): void {
    this.user = { ...this.form.value };
    this.accountService.register(this.user).subscribe(
      () => this.router.navigateByUrl('/dashboard'),
      (error: any) => this.toater.error(error.error)
    );
  }
}
