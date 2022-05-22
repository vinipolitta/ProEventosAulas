import { UserLogin } from './../../../models/identity/user-login';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../../Services/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model = {} as UserLogin;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

  /**
   * login
   */
  public login(): void {
    this.accountService.login(this.model).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard');
      },
      (error: any) => {
        if (error.status == 401)
          this.toaster.error('Usuario ou senha invalido');
        else console.error(error);
      }
    );
  }
}
