import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from "@angular/core";
import { Router, ActivatedRoute, ActivationStart } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { UserService } from "src/app/Services/user.service";
import { filter } from "rxjs/operators";
import { menuItems } from "./side-menu-bar.items";

@Component({
  selector: "app-side-menu-bar",
  templateUrl: "./side-menu-bar.component.html",
  styleUrls: ["./side-menu-bar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SideMenuBarComponent implements OnInit {
  MenuLinks: any = [];

  @Output() toggleMenu = new EventEmitter();

  OpenSubMenu: boolean[] = [];
  IsSplitPane = false;
  currentUser: any;

  constructor(
    public router: Router,
    public userSrvc: UserService,
    public aRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.SubscribeCurrentUserData();
    this.router.events
      .pipe(filter((r) => r instanceof ActivationStart))
      .subscribe((r: any) => {
        this.MenuLinks.forEach((navItem) => {
          if (
            navItem.PageUrl &&
            navItem.PageUrl !== "" &&
            navItem.PageUrl === r.snapshot.url[0].path
          ) {
            navItem.isActiveRoute = true;
          } else if (navItem.SubMenu) {
            navItem.isActiveRoute = false;
            navItem.SubMenu.forEach((subNavItem) => {
              if (
                subNavItem.PageUrl &&
                subNavItem.PageUrl !== "" &&
                subNavItem.PageUrl === r.snapshot.url[0].path
              ) {
                subNavItem.isActiveRoute = true;
              } else {
                subNavItem.isActiveRoute = false;
              }
            });
          } else {
            navItem.isActiveRoute = false;
          }
        });
      });
  }

  SubscribeCurrentUserData() {
    this.userSrvc.loggedInUserUpdated$.subscribe((user: any) => {
      this.currentUser = user;
      this.PrepareMenuLinks();
    });
  }

  PrepareMenuLinks() {
    const IsAdmin: any = this.currentUser.roles[0] === 1;
    const IsBackOffice: any = this.currentUser.roles[0] === 2;
    const IsLeafUser: any = this.currentUser.roles[0] === 5;
    const canCreateRequests: any =
      this.currentUser.roles[0] !== 1 && this.currentUser.roles[0] !== 2;
    if(!this.currentUser.isActive) {
      return;
    }

    this.MenuLinks.push(menuItems[0]);

    this.MenuLinks.push(menuItems[1]);

    if (canCreateRequests) {
      this.MenuLinks[1].SubMenu = [
        {
          title: "New Request",
          PageUrl: "request",
          param: 0,
        },
        {
          title: "Request List",
          PageUrl: "requestList",
        },
        {
          title: "Request Policy Map",
          PageUrl: "requestPolicyMappingList",
        },
      ];
    }
    if (IsAdmin || IsBackOffice) {
      this.MenuLinks[1].SubMenu = [
        {
          title: "Request Submitted",
          PageUrl: "requestSubmittedList",
        },
        {
          title: "Request Map Review",
          PageUrl: "requestMapReviewsList",
        },
      ];
    }

    if (!IsBackOffice && !IsLeafUser) {
      this.MenuLinks.push(menuItems[2]);
      this.MenuLinks[2].SubMenu = [
        {
          title: "New User",
          PageUrl: "User",
        },
        {
          title: "Manage Users",
          PageUrl: "manageUsers",
        },
      ];
    }

    this.MenuLinks.push(menuItems[3]);

    if (IsAdmin) {
      this.MenuLinks.push(menuItems[4]);
      this.MenuLinks[3].SubMenu = [
        {

          title: "Policies Submitted",
          PageUrl: "submittedPolicies",
          queryParams : { mode: "adminReview" }
        }];
    } else {
      this.MenuLinks[3].SubMenu = [
        {
          title: "Add Policy",
          PageUrl: "policy",
          param: 0,
        },
        {
          title: "My Policies",
          PageUrl: "mypolicies",
          queryParams : { mode: "userPolicyList" }
        }];
    }
  }

  OpenPanel(index: number) {
    this.OpenSubMenu[index] = !this.OpenSubMenu[index];
  }

  NavigateToPage(route: any) {
    let url = [route.PageUrl];
    if (route.param || route.param === 0) {
      url = [route.PageUrl, route.param];
    }
    this.router.navigate(url, {queryParams: route.queryParams});
    this.toggleMenu.emit();
  }
}
