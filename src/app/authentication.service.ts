import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public errorMessage : string;
    public loggedIn : boolean;
    constructor(private http: Http) { 
        this.errorMessage = "";
        this.loggedIn = false;
    }

    login(username: string, password: string, grant_type: string) {
        let creds = 'username=' + username + '&password=' + password + '&grant_type=password';

        //let bodyString = JSON.stringify({ 'username': username, 'password': password, 'grant_type': 'password'}); 
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://zenithsocietyservice.azurewebsites.net/connect/token', creds, options)
          
            .map((response: Response) => {
                
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('access_token', user.access_token);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.errorMessage = "";
                    this.loggedIn = true;
                }
            })
            }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
        this.errorMessage = "";
        this.loggedIn = false;
    }
}