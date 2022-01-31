import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


        const idToken = localStorage.getItem("JWT_TOKEN");
        console.log("toktok :: " + idToken)

        if (idToken) {
            const cloned = request.clone({
                headers: request.headers.set("Authorization", idToken)

            }
            );

            return next.handle(cloned);
        }
        else {
            return next.handle(request);
        }
    }
}
