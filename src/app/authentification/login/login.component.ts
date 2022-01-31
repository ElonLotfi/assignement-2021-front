import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService } from 'src/app/shared/logging.service';
import { User } from '../model/user.model';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {

    name?: string
    email?: string
    password?: string
    user?: User


    constructor(
        private loginService: LoggingService,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
    ) { }


    ngOnInit(): void {
    }

    // login
    async onLogin() {
        this.user = {
            name: "",
            email: "",
            password: ""
        }
        if (!this.user) return;
        if (this.email) {
            this.user.email = this.email
            console.log(this.user.email)
        }
        if (this.password) {
            this.user.password = this.password
            console.log(this.user.password)
        }

        this.loginService
            .login(this.user!)
            .subscribe(
                reponse => {
                    if (reponse.token.length == 0) {

                        console.log(reponse.token)
                        this.toastr.error("login failed")
                    }
                    if (reponse.token.length > 0) {
                        window.location.replace('/')

                    }
                }
            )

    }

}
