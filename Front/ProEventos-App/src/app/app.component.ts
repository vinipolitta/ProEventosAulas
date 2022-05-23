import { AccountService } from './Services/account.service';
import { Component, OnInit } from '@angular/core';
import { User } from './models/identity/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentuser();
  }

  setCurrentuser(): void {
    let user: User;
    if (localStorage.getItem('user'))
      user = JSON.parse(localStorage.getItem('user') ?? '{}');
    else user = null;

    if (user) this.accountService.setCurrentUser(user);
  }
}
