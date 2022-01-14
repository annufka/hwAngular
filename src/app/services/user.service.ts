import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  // функции
  // @ts-ignore
  RegistrationUser(Email, Username, Password): Observable<any> {
    const body = {email: Email, username: Username, password: Password};
    return this.http.post(this.baseurl + '/api/v1/auth/users/', body);
  }
  getToken(Password: string, Username: string): Observable<any> {
    const body = {password: Password, username: Username};
    return this.http.post(this.baseurl + '/api/v1/auth-token/token/login/', body);
  }
  getProfile(Token: string): Observable<any> {
    return this.http.get(this.baseurl + '/api/v1/profile/get/user/by/token/',
      {headers: {'Content-Type': 'application/json', Authorization: 'Token ' + Token}});
  }
  patchUserProfile(Phone: string, Address: string, Pseudonym: string, Skype: string, Token: string): Observable<any> {
    const body = {phone: Phone, address: Address, pseudonym: Pseudonym, skype: Skype};
    return this.http.patch(this.baseurl + '/api/v1/profile/patch/user/profile/', body,
      {headers: {'Content-Type': 'application/json', Authorization: 'Token ' + Token}}
    );
  }
  updatePhoto(Photo: File, Id: string): Observable<any> {
    const body = new FormData();
    body.append('photo', Photo);
    return this.http.patch(this.baseurl + '/api/v1/profile/patch/user/profile/photo/' + Id + '/', body);
  }
}
