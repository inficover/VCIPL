import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-kyc-approval",
  templateUrl: "./kyc-approval.component.html",
  styleUrls: ["./kyc-approval.component.scss"]
})
export class KYCApprovalComponent implements OnInit {
  UserInfo: any;
  loadingUsers;

  columnDefs: any = [
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "mailId" },
    { headerName: "User Name", field: "userName" },
    {
      headerName: "Mobile",
      field: "mobile"
    },
    {
      headerName: "Action",
      field: "action"
    }
  ];
  constructor(public userSrvc: UserService, public router: Router) {}

  users: any;

  ngOnInit(): void {
    this.GetUsersData();
  }

  GetUsersData() {
    this.loadingUsers = true;
    this.userSrvc.getAllKycPendingUsers().subscribe(users => {
      this.loadingUsers = false;
      this.users = users;
    });
  }

  viewUserDetails(user) {
    this.router.navigate(["approveKyc", user.id]);
  }
}
