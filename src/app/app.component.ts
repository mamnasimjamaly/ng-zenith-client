import { Component, OnInit, Input } from '@angular/core';
import {Event} from './event';
import {Activity} from './activity';
import {ActivityService} from './activity.service';
import {EventService} from './event.service';
import {EventIdWeekNumber} from './eventIDweekNumber';
import {AuthenticationService} from './authentication.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EventService, ActivityService, AuthenticationService]
})
export class AppComponent implements OnInit {
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private eventService : EventService,
        private authenticationService : AuthenticationService
        ) { 
         
        }
  title = 'Zenith Website';
  public logout() : void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    this.eventService.getEventsWithAuth();
    this.router.navigate(['/events']);
  }

  ngOnInit(): void {
  }
  
  checkLoggedIn() : boolean {
    return localStorage.getItem('access_token') != null;
  } 
}