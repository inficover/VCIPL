import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from "./alert.service";
import { UserService } from "./user.service";
import { DialogService } from "primeng/dynamicdialog";
import { ReLoginComponent } from "../component/re-login/re-login.component";
import {
  RouterStateSnapshot,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from "@angular/router";

@Injectable()
export class TokenInjectorInterceptor implements HttpInterceptor {
  constructor(
    public alertSrvc: AlertService,
    public dialogService: DialogService,
    public route: ActivatedRoute
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem("UserToken");

    if (userToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + userToken)
      });

      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(this.route);
          if (error.status === 401) {
            this.NavigateToReLogin();
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(this.route);
          if (error.status === 401) {
            this.NavigateToReLogin();
          }
          return throwError(error);
        })
      );
    }
  }

  NavigateToReLogin() {
    console.log(this.route);
    const ref = this.dialogService.open(ReLoginComponent, {
      showHeader: false,
      width: "50%"
    });
  }
}
