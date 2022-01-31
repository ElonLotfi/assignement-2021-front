import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggingService } from 'src/app/shared/logging.service';
import { User } from '../model/user.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit {

    name?:string
    email?:string
    password?:string
    user?:User


  constructor(
    private loginService : LoggingService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,

  ) {}

  ngOnInit(): void {

  }

  // login
  onRegister(){
      this.user = {
          name:"",
          email:"",
          password :""
      }
    if (!this.user) return;
    if(this.name){
        this.user.name =this.name
        console.log(this.user.email)
    }
    if(this.email){
        this.user.email =this.email
        console.log(this.user.email)
    }
    if(this.password){
        this.user.password = this.password
        console.log(this.user.password)
    }

    this.loginService
        .register(this.user!)
        .subscribe(
            reponse => {
                console.log(reponse.status)
                if(reponse.status ==="error"){
                    this.toastr.error("register failed")
                }
            }
        )
  }


}
