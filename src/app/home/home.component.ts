import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public timer = 0;
  public days = 0;
  public hours = 0;
  public minutes = 0;
  public seconds = 0;

  time = 0;
  qTimeInSeconds = 0;
  qTime = 0;
  displayTime = "0";
  questionDisplayTime = "0";
  runTimer = false;
  hasStarted = false;
  hasFinished = false;
  clickedAnswer = 0;
  timeInSeconds = 0;
  questionNumber = 1;
  remainingTime = this.timeInSeconds;

  constructor() { }

  ngOnInit() {
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {
      let toDate = new Date("2018/10/15 8:00 AM");
      //let toDate = new Date("2018/10/0 15:4 PM");
      var now = new Date();
      var difference = toDate.getTime() - now.getTime();
      if (difference <= 0 || isNaN(difference)) { return; }
      this.remainingTime--;
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
      else {
        this.hasFinished = true;
      }
    }, 1000);
  }

  timeBetweenDates(toDate) {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
  
    if (difference <= 0) {
  
      // Timer done
      clearInterval(this.timer);
    
    } else {
      
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

      let toDate = new Date("2018/10/15 8:00 AM");
      this.timeBetweenDates(toDate);
    }
  }

}
