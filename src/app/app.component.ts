import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zethuevernt';
  description = 'Angular-Firebase Demo';
  public verificationCode = undefined;
  itemValue = 'worrking';
  public showError = false;

  element: HTMLElement;
  constructor(public db: AngularFireDatabase) {
    this.verificationCode = undefined;
  }

  onSubmit() {
    if(this.verificationCode != undefined){
      let code = this.verificationCode.toLowerCase().trim();
      this.db.database.ref('/guests/' + code).once('value').then(snapshot => {
        var user = snapshot.val();
        if(user != null){
          this.db.list('/guests/confirmed').push({ content: true });
          this.element = document.getElementById('closeModel') as HTMLElement;
          this.element.click();      
          this.verificationCode = undefined;
          this.showError = false;
        }else{
          this.showError = true;
        }
    });    
    }
  }
}
