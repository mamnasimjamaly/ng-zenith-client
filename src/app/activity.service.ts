import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {Activity} from './activity';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ActivityService {
    private BASE_URL = "http://localhost:51083/api/Activities"; 
   constructor(private http: Http) { } 
   getActivities(): Promise<Activity[]> {
    return this.http.get(this.BASE_URL)
    .toPromise()
    .then(response => response.json() as Activity[])
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}
}