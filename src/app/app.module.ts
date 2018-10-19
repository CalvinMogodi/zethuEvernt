import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProgrammeComponent } from './programme/programme.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { PackageComponent } from './package/package.component';
import { ContactusComponent } from './contactus/contactus.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventmapComponent } from './eventmap/eventmap.component';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ProgrammeComponent,
    SpeakersComponent,
    PackageComponent,
    ContactusComponent,
    EventmapComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAntCeYUauXnYIBuZCmxFEfoYExjeBLG4M'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
