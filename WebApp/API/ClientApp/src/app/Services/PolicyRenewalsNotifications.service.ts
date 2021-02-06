import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from './user.service';
import { AlertService } from "./alert.service";

@Injectable({ providedIn: "root" })
export class PolicyRenewalsNotificationsService {
  private masterData$;

  constructor(private httpServie: HttpClient, private userService: UserService, private alertService: AlertService) { }

  RefreshNotifications() {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get("/api/PolicyRenewalNotifications/RefreshNotifications?userId=" + this.userService.loggedInUser.id)
      .pipe( map(data => {
        this.alertService.itemsLoading$.next(-1);
        return data;
      }));
  }

  UpdateNotificationStatus(ids, status) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/PolicyRenewalNotifications/UpdateNotificationStatus", {ids, status}).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  GetPolicyRenewalNotificationByCriteria() {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get("/api/PolicyRenewalNotifications/GetPolicyRenewalNotificationByCriteria?userId=" + this.userService.loggedInUser.id)
    .pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

}
