import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../services/user.service';

// @ts-ignore
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  constructor(private apiUser: UserService) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      login: new FormControl(null),
      password: new FormControl(null),
    });
  }
  getToken(Password: string, Username: string): void {
    this.apiUser.getToken(Password, Username).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('my-token', data.auth_token);
      },
      error => {
        console.log(error);
      }
    );
  }

  login(): void {
    console.log(this.formLogin.value.login);
    console.log(this.formLogin.value.password);
    this.getToken(this.formLogin.value.password, this.formLogin.value.login);
  }
}
