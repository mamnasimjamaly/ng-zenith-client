import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },{
    path: '',
    component: EventsComponent
  }
])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
