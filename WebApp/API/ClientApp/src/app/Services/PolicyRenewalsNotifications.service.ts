import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { shareReplay } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: "root" })
export class PolicyRenewalsNotificationsService {
  private masterData$;

  constructor(private httpServie: HttpClient, private userService: UserService) { }

  RefreshNotifications() {
    return this.httpServie.get("/api/PolicyRenewalNotifications/RefreshNotifications?userId=" + this.userService.loggedInUser.id);
  }

  UpdateNotificationStatus(ids, status) {
    return this.httpServie.post("/api/PolicyRenewalNotifications/UpdateNotificationStatus", {ids, status});
  }

  GetPolicyRenewalNotificationByCriteria() {
    return this.httpServie.get("/api/PolicyRenewalNotifications/GetPolicyRenewalNotificationByCriteria?userId=" + this.userService.loggedInUser.id);
  }

}
