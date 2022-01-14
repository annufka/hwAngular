import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { UserService } from '../services/user.service';

// @ts-ignore
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formRegistration: FormGroup;
  constructor(private apiUser: UserService) { }

  ngOnInit(): void {
    this.formRegistration = new FormGroup({
      login: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }
  RegistrationUser(Email: string, Username: string, Password: string): void {
    this.apiUser.RegistrationUser(Email, Username, Password).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  registration(): void {
    this.RegistrationUser(this.formRegistration.value.email, this.formRegistration.value.login, this.formRegistration.value.password);
  }
}
