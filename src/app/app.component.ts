import { Component, OnInit, Input } from '@angular/core';
import {Event} from './event';
import {Activity} from './activity';
import {ActivityService} from './activity.service';
import {EventService} from './event.service';
import {EventIdWeekNumber} from './eventIDweekNumber';
import { Router, ActivatedRoute } from '@angular/router';
import {EventsComponent} from './events/events.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EventService, ActivityService]
})
export class AppComponent {
  @Input() eventsComponent : EventsComponent;
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private eventService : EventService
        ) { }
  title = 'Zenith Website';
  public logout() : void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    //this.eventsComponent.getEvents();
    this.router.navigate(['']);
  }
}