import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class AppComponent {
  title = 'zethuevernt';
  description = 'Angular-Firebase Demo';
  public verificationCode = undefined;
  itemValue = 'worrking';
  public showError = false;
  public isOpen = false;
  public showSuc = false;
  element: HTMLElement;
  constructor(public db: AngularFireDatabase) {
    this.verificationCode = undefined;
  }

  procced() {
    if (this.verificationCode != undefined) {
      let code = this.verificationCode.toLowerCase().trim();
      this.isOpen = true;
      this.db.database.ref('/guests/' + code).once('value').then(snapshot => {
        var user = snapshot.val();
        if (user != null) {
        }
      })
    }
  }
  onSubmit() {
    this.db.list('/guests/confirmed').push({ content: true });
    this.showSuc = true;
    this.showError = false;
  }
}
