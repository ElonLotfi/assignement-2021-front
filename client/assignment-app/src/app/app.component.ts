import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { LoggingService } from './shared/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = "Application de gestion des Assignments";


  logged = false

  constructor(
    private authService: AuthService,
    private loggingService: LoggingService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkIsLogged()
  }

  checkIsLogged(){
    if (sessionStorage.getItem("JWT_TOKEN")!.length > 0) {
      this.logged = true;
    }else{
      this.logged = false;
    }
  }

  logout() {
    this.loggingService.doLogout()
    //this.router.navigate(["/login"]);
    window.location.reload();
  }


}
