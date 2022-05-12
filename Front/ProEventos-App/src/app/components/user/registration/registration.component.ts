import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public form :FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  formulario() {
    this.form = this.fb.group(
      {

      }

    )
  }

}
