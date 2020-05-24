import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertService } from "src/app/Services/alert.service";
import { UserService } from "src/app/Services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  PasswordForm: FormGroup;
  submitted = false;
  currentUser: any;

  constructor(
    public fb: FormBuilder,
    public alert: AlertService,
    public userSrvc: UserService,
    public router: Router
  ) {
    this.SubscribeCurrentUserData();
  }

  ngOnInit() {
    this.CreatePasswordFormGroup();
  }

  SubscribeCurrentUserData() {
    this.userSrvc.loggedInUserUpdated$.subscribe(
      user => (this.currentUser = user)
    );
  }

  CreatePasswordFormGroup() {
    this.PasswordForm = this.fb.group(
      {
        oldPassword: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        newPassword: ["", Validators.required]
      },
      { validator: this.MatchPassword }
    );
  }

  MatchPassword(control: FormGroup) {
    const password = control.get("newPassword").value;
    const confirmPassword = control.get("confirmPassword").value;
    if (password !== confirmPassword) {
      control.get("confirmPassword").setErrors({ ConfirmPassword: true });
    } else {
      return null;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.PasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.PasswordForm.invalid) {
      return;
    }
    const UserData: any = this.PasswordForm.value;
    delete UserData.confirmPassword;
    UserData.id = this.currentUser.id;
    this.userSrvc.changePassword(UserData).subscribe((val: any) => {
      this.alert.SuccesMessageAlert("Password Changed Sucessfully", "Close");
      this.router.navigateByUrl("login");
    });
  }
}
