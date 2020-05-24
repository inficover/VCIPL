import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/Services/authentication.service";
import { UserService } from "src/app/Services/user.service";
import { MdePopoverTrigger } from "@material-extended/mde";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  templateUrl: "re-login.component.html"
  // styleUrls: ["re-login.component.scss"]
})
export class ReLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public ref: DynamicDialogRef
  ) {
    this.SubscribeCurrentUserData();
  }

  SubscribeCurrentUserData() {
    this.userService.loggedInUserUpdated$.subscribe(
      user => (this.currentUser = user)
    );
  }

  ngOnInit() {
    this.CreateLoginForm();
  }

  CreateLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        (userDetails: any) => {
          this.error = null;
          this.loading = false;
          this.userService.storeUserTokenandDetails(userDetails);
          this.ref.close();
        },
        error => {
          this.error = error.error.message;
          this.loading = false;
        }
      );
  }
}
