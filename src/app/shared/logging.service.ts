import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { User } from '../authentification/model/user.model';
import { Token } from '@angular/compiler/src/ml_parser/tokens';



@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(
    private http: HttpClient) { }


  loggedIn = false;

  url_login = "https://api-assy.herokuapp.com/api/login";
  url_register = "https://api-assy.herokuapp.com/api/register";
  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN'
  private loggedUser: string | undefined;



  // Permet l'utilisateur de se connecter 
  login(user: User): Observable<any> {
    return this.http.post<any>(this.url_login, user).pipe(
      tap(res =>
        this.doLoginUser(res.email, res.token)),

    )
  }

  // Permet l'utilisateur de faire un compte 
  register(user: User): Observable<any> {

    return this.http.post<User>(this.url_register, user);
  }

  private doLoginUser(email: string, token: string) {
    this.storeTokens(token)
    this.loggedUser = email
    if (token.length > 0) {
      this.loggedIn = true;
    }
  }

  doLogout() {
    sessionStorage.setItem("JWT_TOKEN", "")
    this.loggedUser = ""
    this.loggedIn = false;
  }

  private storeTokens(token: string) {
    sessionStorage.setItem(this.JWT_TOKEN, token)
    sessionStorage.setItem(this.REFRESH_TOKEN, token)
  }

  log(assignmentName: string, action: string) {
    // par ex "Nouveau devoir Angular de Buffa AJOUTE"
    console.log("LOGGIN SERVICE : " + assignmentName + " " + action);
  }

  isLogged() {
    const isUserLoggedIn = new Promise((resolve, reject) => {
      // ici typiquement, on pourrait faire une requête
      // et donc ça prendrait du temps... c'est la raison
      // pour laquelle on renvoie une promesse....
      if(sessionStorage.getItem("JWT_TOKEN")!.length>0){
        this.loggedIn = true
      }
      resolve(this.loggedIn);
    });

    return isUserLoggedIn;
  }


}
