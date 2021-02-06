import { Component, ViewChild, Renderer2, ElementRef } from "@angular/core";
import { UserService } from "src/app/Services/user.service";
import { MasterData } from "src/app/Services/masterdata.service";
import { AlertService } from "src/app/Services/alert.service";

@Component({
  selector: "app-app-root",
  templateUrl: "./app-root.component.html",
  styleUrls: ["./app-root.component.scss"]
})
export class AppRootComponent {
  showMenu = false;
  currentUser;
  loadingCount = 0;
  constructor(
    private renderer: Renderer2,
    public userService: UserService,
    public masterData: MasterData,
    public alertService: AlertService
  ) {
    this.SubscribeCurrentUserData();
    this.userService.getMasterData().subscribe(data => {
      this.masterData.data = data;
    });
    this.alertService.itemsLoading$.subscribe(data => {
      setTimeout(() => this.loadingCount =+ data);
    })
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
