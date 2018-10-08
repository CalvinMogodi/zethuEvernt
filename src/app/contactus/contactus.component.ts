import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactUsForm: FormGroup;
  public str = false;
  public showError = false;
  public submitAttempt = false;
  public message = {
    name: '',
    surname: '',
    contactNumber: '',
    email: '',
    message: '',
  }
  constructor(public formBuilder: FormBuilder, public db: AngularFireDatabase) { 
    this.contactUsForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      contactNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
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
      this.showError = true;
      this.message = {
        name: '',
        surname: '',
        contactNumber: '',
        email: '',
        message: '',
      }
      this.contactUsForm.reset();
      this.submitAttempt = false;
    }
  }

}
