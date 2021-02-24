import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/Services/user.service";
import { AlertService } from "src/app/Services/alert.service";
import { ActivatedRoute, Router } from "@angular/router";

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
  mode;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    private userService: UserService,
    private alert: AlertService, public route: ActivatedRoute
  ) {
  }

  SubscribeUserData() {
    this.userService.loggedInUserUpdated$.subscribe((user: any) => {
      this.currentUser = user;
      this.GetUserRoles();
      this.mode = this.route.snapshot.queryParams.mode;
      if(this.mode === 'update') {
        this.CreateUserGroup(window.history.state);
      } else {
        this.CreateUserGroup();
      }

    });
  }

  ngOnInit(): void {
    this.SubscribeUserData();
  }

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

  CreateUserGroup(user?) {
    if(user) {
      this.UserForm = this.fb.group({
        name: [user.name, Validators.required],
        userName: [user.userName, Validators.required],
        mailId: [user.mailId, [Validators.email, Validators.required]],
        mobile: [user.mobile, Validators.compose([Validators.required, Validators.pattern('[6-9]\\d{9}')])],
        Roles: [user.roles[0], Validators.required],
        CreatedBy: [user.createdBy],
        status: [user.status],
        payout: [user.payout , Validators.compose([Validators.max(100), Validators.min(0)])],
      });
    } else {
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

  UpdateUser() {
    this.userService.updateUserBasicDetails(this.UserForm.value).subscribe(data => {
      this.alert.SuccesMessageAlert("User updated Succesfully", "Close");
      this.router.navigateByUrl("/manageUsers");
    });
  }

  CreateUser() {
    this.UserForm.get("Roles").setValue([+this.UserForm.value.Roles]);
    this.UserForm.get("payout").setValue(+this.UserForm.value.payout);
    // Back office role does not require KYC hence add status as approved on creation
    if (+this.UserForm.value.Roles == 2) {
      this.UserForm.get("status").setValue(4);
      this.UserForm.get("payout").setValue(null);
    }
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
