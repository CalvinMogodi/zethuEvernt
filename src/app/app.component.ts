import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public applyIsComplete = false;
  public showPackageError = false;
  public partnerSubmitAttempt = false;
  title = 'zethuevernt';
  description = 'Angular-Firebase Demo';
  public verificationCode = undefined;
  itemValue = 'worrking';
  public showError = false;
  public isOpen = false;
  public codeError = false;
  public showSuc = false;
  public titleText = 'Title';
  public packageText = 'Title';
  public guest = {
    key: '',
    titleText: '',
    name: '',
    surname: '',
    contactNumber: '',
    email: '',
    role: '',
    organization: '',
    officeNumber: '',
  };

  public partner = {
    titleText: '',
    name: '',
    surname: '',
    contactNumber: '',
    email: '',
    role: '',
    organization: '',
    officeNumber: '',
  };

  public submitAttempt = false;
  userForm: FormGroup;
  partnerForm: FormGroup;  
  public timer = 0;
  public days = 0;
  public hours = 0;
  public minutes = 0;
  public seconds = 0;
  constructor(public formBuilder: FormBuilder, public db: AngularFireDatabase) {
    this.verificationCode = undefined;
    this.userForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      contactNumber: [''],
      officeNumber: [''],      
      email: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
      organization: ['', Validators.compose([Validators.required])],
    });

    this.partnerForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      contactNumber: [''],
      officeNumber: [''],      
      email: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
      organization: ['', Validators.compose([Validators.required])],
    });
    
    this.timerTick();
  }

  setTitle(text){
    this.titleText = text;
    this.guest.titleText = text; 
  }

  setPartnerTitle(text){
    this.packageText = text;
  }

  procced() {
    this.codeError = false;
    if (this.verificationCode != undefined) {
      let code = this.verificationCode.toLowerCase().trim();
      this.db.database.ref('guests').orderByChild("code").equalTo(code).once("value", snapshot => {  
        snapshot.forEach(item => {
          let dbGuest = item.val();
          if(this.guest != null){
            this.guest.key = item.key;
            this.guest.name = dbGuest.name;
            this.guest.surname = dbGuest.surname;
            this.guest.contactNumber = dbGuest.contactNumber;        
            this.guest.email = dbGuest.email;
            this.guest.officeNumber = dbGuest.officeNumber;
            this.guest.organization = dbGuest.organization;
            this.guest.role = dbGuest.role;    
            this.titleText = dbGuest.titleText;      
            this.guest.titleText = dbGuest.titleText;     
            this.isOpen = true;
          }else{
            this.isOpen = false;
            this.codeError = true;
          }
          return true;
        })
        this.codeError = true;
      });      
    }
  }
  onSubmit() {
    this.submitAttempt = true;
    if(this.userForm.valid){
      var updates = {};
      updates['guests/'+this.guest.key+'/confirmed/'] = true;    
      updates['guests/'+this.guest.key+'/name/'] = this.guest.name; 
      updates['guests/'+this.guest.key+'/surname/'] = this.guest.surname; 
      updates['guests/'+this.guest.key+'/contactNumber/'] = this.guest.contactNumber; 
      updates['guests/'+this.guest.key+'/email/'] = this.guest.email;  
      updates['guests/'+this.guest.key+'/organization/'] = this.guest.organization; 
      updates['guests/'+this.guest.key+'/officeNumber/'] = this.guest.officeNumber; 
      updates['guests/'+this.guest.key+'/role/'] = this.guest.role;  
      updates['guests/'+this.guest.key+'/titleText/'] = this.guest.titleText;        
      this.db.database.ref().update(updates);      
      this.showSuc = true;
      this.showError = false;
    }    
  }

  submitPackage() {
    this.partnerSubmitAttempt = true;
    if(this.partnerForm.valid){
      this.db.database.ref().push(this.partner);      
      this.applyIsComplete = true;
      this.showPackageError = false;
    }    
  }

  timerTick() {
    setTimeout(() => {
      let toDate = new Date("2018/11/20 8:00 AM");
      //let toDate = new Date("2018/10/0 15:4 PM");
      var now = new Date();
      var difference = toDate.getTime() - now.getTime();
      if (difference <= 0 || isNaN(difference)) { return; }
      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24);
  
      hours %= 24;
      minutes %= 60;
      seconds %= 60;
  
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      if (difference > 0) {
        this.timerTick();
      }
    }, 1000);
  }
}
