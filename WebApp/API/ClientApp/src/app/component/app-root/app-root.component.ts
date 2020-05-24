import { Component, ViewChild, Renderer2, ElementRef } from "@angular/core";
import { UserService } from "src/app/Services/user.service";
import { MasterData } from "src/app/Services/masterdata.service";

@Component({
  selector: "app-app-root",
  templateUrl: "./app-root.component.html",
  styleUrls: ["./app-root.component.scss"]
})
export class AppRootComponent {
  showMenu = false;
  currentUser;
  constructor(
    private renderer: Renderer2,
    public userService: UserService,
    public masterData: MasterData
  ) {
    this.SubscribeCurrentUserData();
    this.userService.getMasterData().subscribe(data => {
      this.masterData.data = data;
    });
  }

  ToggleSidePane() {
    this.showMenu = !this.showMenu;
  }

  SubscribeCurrentUserData() {
    this.userService.loggedInUserUpdated$.subscribe(
      user => (this.currentUser = user)
    );
  }
}
