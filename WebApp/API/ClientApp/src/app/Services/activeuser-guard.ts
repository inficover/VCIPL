import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { UserService } from "../Services/user.service";

@Injectable({ providedIn: "root" })
export class ActiveUserGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.userService.loggedInUser.isActive ||
      this.userService.loggedInUser.roles[0] === 1;

  }
}
