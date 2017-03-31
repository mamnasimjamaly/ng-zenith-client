import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticationService } from '../authentication.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    providers: [AuthenticationService]
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        //private alertService: AlertService
        ) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = '/events';
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password, "password")
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                 //   this.alertService.error(error);
                    this.loading = false;
                });
    }
}