import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppRootComponent } from "./component/app-root/app-root.component";
import { LoginComponent } from "./component/login/login.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { UserCreationComponent } from "./component/user-creation/user-creation.component";
import { AuthGuard } from "./Services/auth.guard";
import { UserDetailsComponent } from "./component/user-details/user-details.component";
import { ChangePasswordComponent } from "./component/change-password/change-password.component";
import { UserManagementComponent } from "./component/user-management/user-management.component";
import { KYCApprovalComponent } from "./component/kyc-approval/kyc-approval.component";
import { ApproveKYCComponent } from "./component/approve-kyc/approve-kyc.component";
import { RequestListComponent } from "./component/request-list/request-list.component";
import { ActiveUserGuard } from "./Services/activeuser-guard";
import { RequestDetailsComponent } from "./component/request-details/request-details.component";
import { RequestSubmittedDashboardComponent } from "./component/request-submitted-dashboard/request-submitted-dashboard.component";
import { RequestPolicyMappingListComponent } from "./component/request-policy-mapping-list/request-policy-mapping-list.component";
import { RequestMapReviewListComponent } from "./component/request-map-review-list/request-map-review-list.component";

const routes: Routes = [
  {
    path: "",
    component: AppRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "Dashboard",
        component: DashboardComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "",
        component: DashboardComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "User",
        component: UserCreationComponent,
        canActivate: [ActiveUserGuard],
      },
      { path: "UserDetails", component: UserDetailsComponent },
      {
        path: "changePassword",
        component: ChangePasswordComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "manageUsers",
        component: UserManagementComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "kycApproval",
        component: KYCApprovalComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "approveKyc/:id",
        component: ApproveKYCComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "request/:id",
        component: RequestDetailsComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "requestList",
        component: RequestListComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "requestSubmittedList",
        component: RequestSubmittedDashboardComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "requestSubmittedList",
        component: RequestSubmittedDashboardComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "requestPolicyMappingList",
        component: RequestPolicyMappingListComponent,
        canActivate: [ActiveUserGuard],
      },
      {
        path: "requestMapReviewsList",
        component: RequestMapReviewListComponent,
        canActivate: [ActiveUserGuard],
      },
    ],
  },
  { path: "login", component: LoginComponent },
  // { path: "**", redirectTo: "/Dashboard" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
