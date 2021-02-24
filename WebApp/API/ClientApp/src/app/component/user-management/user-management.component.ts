import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { of } from "rxjs";
import { UserService } from "src/app/Services/user.service";
import { MasterData } from "src/app/Services/masterdata.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { NodeService } from "./node.service";
import { TreeNode } from "primeng/api/treenode";
import { map } from "rxjs/operators";
import { DialogService } from 'primeng/dynamicdialog';
import { UserPayoutComponent } from '../policy/User-Payout/user-payout.component';
import { Router } from "@angular/router";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  users;
  managers;
  dialogRef;
  @ViewChild("managerAssignDialog") managerAssignDialog;
  activeUsersCount = 0;
  totalUsersCount = 0;

  cols: any[];

  selectedNode;
  items;

  constructor(
    private userService: UserService,
    public masterData: MasterData,
    public dialog: MatDialog,
    private nodeService: NodeService,
    public dialogService: DialogService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getUsers();

    this.cols = [
      { field: "name", header: "Name" },
      { field: "reporteesCount", header: "No of Reportees (Total/ Active)" },
      { field: "mailId", header: "Email" },
      { field: "mobile", header: "Mobile" },
      { field: "role", header: "Role" },
    ];

    this.items = [
      {
        label: "Change Manager",
        icon: "pi pi-user-edit",
        command: (event) => this.changeManager(this.selectedNode.data),
      },
      {
        label: "Update details",
        icon: "pi pi-user-edit",
        command: (event) => this.UpdateUserDetails(this.selectedNode.data),
      },
    ];
  }

  getUsers() {
    this.userService
      .getAllUsersCreatedByLoggedInUser()
      .pipe(
        map((user: any) => {
          user = user.map((u) => {
            u.role = this.masterData.data.roles.find(
              (s) => s.id === u.roles[0]
            ).roleName;
            return { data: u, children: [], leaf: false };
          });

          return user;
        })
      )
      .toPromise()
      .then((users: any) => {
        this.users = users;
        if (users.length > 0) {
          this.activeUsersCount = users.map((u) => u)[0].data.activeUsers;
          this.totalUsersCount = users.map((u) => u)[0].data.totalUsers;
        }
      });
  }

  userExpanded(event) {
    const user = event.node.data;
    console.log(user);
    if (user.totalReportees > 0) {
      this.userService
        .getAllUsersCreatedByUser(user.id)
        .pipe(
          map((userRes: any) => {
            userRes = userRes.map((u) => {
              u.role = this.masterData.data.roles.find(
                (s) => s.id === u.roles[0]
              ).roleName;
              return { data: u, children: [], leaf: false };
            });

            return userRes;
          })
        )
        .toPromise()
        .then((users: any) => {
          this.users.forEach((u) => {
            if (u.data.id === user.id) {
              u.children = users;
            }
            u.children.forEach((innerUser) => {
              if (innerUser.data.id === user.id) {
                innerUser.children = users;
              }

              innerUser.children.forEach((n1innerUser) => {
                if (n1innerUser.data.id === user.id) {
                  n1innerUser.children = users;
                }
                n1innerUser.children.forEach((n2innerUser) => {
                  if (n2innerUser.data.id === user.id) {
                    n2innerUser.children = users;
                  }
                });
              });
            });
          });

          this.users = [...this.users];
        });
    }
  }

  changeActivation(user) {
    this.userService
      .setActiveStatus(user.id, !user.isActive)
      .subscribe((res) => {
        if (res) {
          user.isActive = !user.isActive;
          // if (user.isActive) {
          //   this.activeUsersCount = this.activeUsersCount + 1;
          //   this.inActiveUsersCount = this.inActiveUsersCount - 1;

          // } else {
          //   this.inActiveUsersCount = this.inActiveUsersCount + 1;
          //   this.activeUsersCount = this.activeUsersCount - 1;

          // }
        }
      });
  }

  changeManager(user) {
    this.userService.GetAllOtherManagers(user.id).subscribe((data) => {
      this.managers = data;
      this.dialogRef = this.dialog.open(this.managerAssignDialog, {
        height: "250px",
        width: "350px",
      });

      this.dialogRef.afterClosed().subscribe((result) => {
        if (!result) {
          return;
        }

        this.userService.changeUserManager(user.id, result).subscribe(() => {
          this.getUsers();
        });
      });
    });
  }

  UpdateUserDetails(user) {
    this.router.navigate(['User'], { queryParams: { mode: "update"}, state : user});
  }
}
