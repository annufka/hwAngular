import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { UserService } from '../services/user.service';
import {environment} from '../../environments/environment';
import {toBase64String} from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  baseurl = environment.apiUrl;
  token: any;
  profile: any;
  fileToUpload: File = null;
  imageUrl = '';
  id = '';
  formProfile = new FormGroup({
    phone: new FormControl(null),
    address: new FormControl(null),
    pseudonym: new FormControl(null),
    skype: new FormControl(null),
  });

  constructor(private apiUser: UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('my-token');
    if (this.token.length > 5) {
      this.getProfile(this.token);
    } else {
      window.location.href = '/login';
    }
  }

  getProfile(Token: string): void {
    this.apiUser.getProfile(Token).subscribe(
      data => {
        console.log(data);
        this.profile = data;
        this.id = data.user.id;
        this.formProfile = new FormGroup({
          phone: new FormControl(data.phone),
          address: new FormControl(data.address),
          pseudonym: new FormControl(data.pseudonym),
          skype: new FormControl(data.skype),
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  patch() {
    this.patchUserProfile(this.formProfile.value.phone, this.formProfile.value.address, this.formProfile.value.pseudonym,
      this.formProfile.value.skype, this.token);
  }

  patchUserProfile(Phone: string, Address: string, Pseudonym: string, Skype: string, Token: string): void {
    this.apiUser.patchUserProfile(Phone, Address, Pseudonym, Skype, Token).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  handleFileInput(files: any) {
    console.log(files);
    this.fileToUpload = files.files.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  // tslint:disable-next-line:typedef
  update() {
    this.updatePhoto(this.fileToUpload, this.token);
  }

  updatePhoto(Photo: File, Token: string): void {
    console.log(this.id);
    this.apiUser.updatePhoto(Photo, this.id).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
