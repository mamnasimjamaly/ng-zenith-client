import { Injectable } from '@angular/core';
import { Event } from './event';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
  private BASE_URL ;
  constructor(private http: Http) { }
  getEventsWithAuth(): Promise<Event[]> {
    if(localStorage.getItem('access_token')) {
      this.BASE_URL ="http://zenithsocietyservice.azurewebsites.net/api/eventapi";
    } else {
      this.BASE_URL ="http://zenithsocietyservice.azurewebsites.net/api/homeapi";
    }
    let authHeader = new Headers();
    let token = localStorage.getItem('access_token');
    console.log(localStorage.getItem('access_token'));
    authHeader.append('Authorization', 'Bearer ' + token);
    console.log(authHeader);
    return this.http.get(this.BASE_URL, {
      headers: authHeader
    })
      .toPromise()
      .then(response => response.json() as Event[], ()=> console.log("error"))
      .catch(this.handleError);
  }

  getEvents(): Promise<Event[]> {
    return this.http.get(this.BASE_URL)
      .toPromise()
      .then(response => response.json() as Event[])
      .catch(this.handleError);
  }

  private handleError(): Promise<any> {
    console.error('An error occurred'); // for demo purposes only
    return Promise.reject("error");
  }

}
