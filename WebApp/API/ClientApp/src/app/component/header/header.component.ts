import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { UserService } from "src/app/Services/user.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  currentUser: any;
 geeeting;
  constructor(
    public router: Router,
    private breakpointObserver: BreakpointObserver,
    public userService: UserService
  ) {
    this.SubscribeCurrentUserData();
  }

  ngOnInit() {
    this.setGreeting();
  }

  SubscribeCurrentUserData() {
    this.userService.loggedInUserUpdated$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  setGreeting() {
    const myDate = new Date();
    const hrs = myDate.getHours();

    if (hrs < 12) {
      this.geeeting = "Good Morning";
    } else if (hrs >= 12 && hrs <= 17) {
      this.geeeting = "Good Afternoon";
    } else if (hrs >= 17 && hrs <= 24) {
      this.geeeting = "Good Evening";
    }
  }

  ToggleSideMenu() {
    this.toggleMenu.emit();
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/login");
  }
  goToMyProfile() {
    this.router.navigateByUrl("/UserDetails");
  }
}
