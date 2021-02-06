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
      this.shiftDates(cloned.body);
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

  shiftDates(body) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (value instanceof Date) {
        body[key] = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes()
          , value.getSeconds()));
      } else if (typeof value === 'object') {
        this.shiftDates(value);
      }
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
