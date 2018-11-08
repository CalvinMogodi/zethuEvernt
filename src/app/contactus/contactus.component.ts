import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactUsForm: FormGroup;
  //public url: string = "http://laravel.site:7000/api";
  public url: string = "http://auditionsalertsa.dedicated.co.za/api";
  public str = false;
  public showError = false;
  public submitAttempt = false;
  lat: number = 51.678418;
  lng: number = 7.809007;
  public message = {
    name: '',
    surname: '',
    contactNumber: '',
    emailaddress: '',
    message: '',
  }
  constructor(public formBuilder: FormBuilder, public db: AngularFireDatabase, public http: HttpClient) { 
    this.contactUsForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      contactNumber: ['', Validators.compose([Validators.required])],
      emailaddress: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  sendMessage (){
    this.submitAttempt = true;
    this.showError = false;
    if (this.contactUsForm.valid) {
      this.db.list('/messages').push(this.message);  
      let emailTosent = {
        name: this.message.name,
        surname: this.message.surname,
        contactnumber: this.message.contactNumber,
        emailaddress: this.message.emailaddress,
        message: this.message.message,
      };
      let emailTosentJson = JSON.stringify(emailTosent);
      this.http.post(this.url + "/zethurcontactus", emailTosentJson).subscribe(data => {
        let Working = "";
            });
      this.showError = true;
      this.message = {
        name: '',
        surname: '',
        contactNumber: '',
        emailaddress: '',
        message: '',
      }
      this.contactUsForm.reset();
      this.submitAttempt = false;
    }
  }

}
