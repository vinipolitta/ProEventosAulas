import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() iconClass!: string;
  @Input() botaoListar = false
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  listar() {
    this.router.navigate([`/${this.title.toLocaleLowerCase()}/lista`])
  }
}
