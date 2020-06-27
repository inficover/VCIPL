import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/Services/user.service";
import { AlertService } from "src/app/Services/alert.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-creation",
  templateUrl: "./user-creation.component.html",
  styleUrls: ["./user-creation.component.scss"],
})
export class UserCreationComponent implements OnInit {
  UserForm: FormGroup;
  Roles: any = [];
  Users: any = [];
  currentUser: any;
  submitted = false;
  error;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private userService: UserService,
    private alert: AlertService
  ) {
    this.SubscribeUserData();
  }

  SubscribeUserData() {
    this.userService.loggedInUserUpdated$.subscribe((user: any) => {
      this.currentUser = user;
      this.GetUserRoles();
      this.CreateUserGroup();
    });
  }

  ngOnInit(): void {}

  GetUserRoles() {
    this.userService
      .getMasterData()
      .subscribe(
        (data: any) =>
          (this.Roles = data.roles.filter(
            (r) => r.id > this.currentUser.roles[0]
          ))
      );
  }

  CreateUserGroup() {
    this.UserForm = this.fb.group({
      name: ["", Validators.required],
      userName: ["", Validators.required],
      mailId: ["", [Validators.email, Validators.required]],
      mobile: ["", Validators.compose([Validators.required, Validators.pattern('[6-9]\\d{9}')])],
      Roles: ["-1", Validators.required],
      CreatedBy: [""],
      status: [1],
      payout: [null , Validators.compose([Validators.max(100), Validators.min(0)])],
    });
    // this.UserForm.get('Roles').setValue([1,2]);
    this.UserForm.get("CreatedBy").setValue(this.currentUser.id);
  }

  get form() {
    return this.UserForm.controls;
  }

  SaveUser() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.UserForm.invalid) {
      return;
    }
    this.CreateUser();
  }

  CreateUser() {
    this.UserForm.get("Roles").setValue([+this.UserForm.value.Roles]);
    this.UserForm.get("payout").setValue(+this.UserForm.value.payout);
    this.userService.createUser(this.UserForm.getRawValue()).subscribe(
      (val: any) => {
        this.alert.SuccesMessageAlert("User Created Succesfully", "Close");
        this.router.navigateByUrl("/manageUsers");
      },
      (error) => {
        if (error.status === 400) {
          if (!error.error.message) {
            error.error.message = "Something went wrong";
          }
          this.error = error.error.message;
        }
      }
    );
  }
}
