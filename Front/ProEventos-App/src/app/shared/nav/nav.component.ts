import { AccountService } from './../../Services/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = true;

  constructor(private router: Router, public accountService: AccountService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/user/login')
  }

  showMenu(): boolean {
    return this.router.url !== '/user/login';
  }
}
