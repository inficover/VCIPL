import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRootComponent } from "./component/app-root/app-root.component";
import { LoginComponent } from "./component/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SideMenuBarComponent } from "./component/side-menu-bar/side-menu-bar.component";
import { HeaderComponent } from "./component/header/header.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { UserCreationComponent } from "./component/user-creation/user-creation.component";
import { AgGridModule } from "ag-grid-angular";
import { TokenInjectorInterceptor } from "./Services/token-injector.interceptor";
import { ChangePasswordComponent } from "./component/change-password/change-password.component";
import { UserManagementComponent } from "./component/user-management/user-management.component";
import { KYCApprovalComponent } from "./component/kyc-approval/kyc-approval.component";
import { UserDetailsComponent } from "./component/user-details/user-details.component";
import { ApproveKYCComponent } from "./component/approve-kyc/approve-kyc.component";

import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { RequestListComponent } from "./component/request-list/request-list.component";
import { ReLoginComponent } from "./component/re-login/re-login.component";
import { MapPolicyComponent } from "./component/map-policy/map-policy.component";
import { RequestDetailsComponent } from "./component/request-details/request-details.component";
import { RequestSubmittedDashboardComponent } from "./component/request-submitted-dashboard/request-submitted-dashboard.component";
import { SendPaymentLinkComponent } from "./component/send-payment-link/send-payment-link.component";
import { SendQuoteComponent } from "./component/send-quote/send-quote.component";
import { RequestPolicyMappingListComponent } from "./component/request-policy-mapping-list/request-policy-mapping-list.component";
import { RequestMapReviewListComponent } from "./component/request-map-review-list/request-map-review-list.component";
import { PolicyDetailsComponent } from './component/policy/policy-details/policy-details.component';
import { MatWrapperModule } from './wrapper-modules/material-wrapper.module';
import { PrimeNgWrapperModule } from './wrapper-modules/prime-ng-wrapper.module';
import { PolicyListComponent } from './component/policy/policy-list/policy-list.component';
import { AddVehicleComponent } from './component/master-data/add-vehicle/add-vehicle.component';
import { ManageVehiclesComponent } from './component/master-data/manage-vehicles/manage-vehicles.component';
import { ManageMasterDataComponent } from './component/master-data/manage-master-data/manage-master-data.component';
import { FixPayoutComponent } from './component/policy/fix-payout/fix-payout.component';
import { BulkUploadResultsComponent } from './components/master-data/bulk-upload-results/bulk-upload-results.component';
import { UserPayoutComponent } from './component/policy/User-Payout/user-payout.component';
import { SellPolicyComponent } from './sell-policy/sell-policy.component';
import { AddMasterDataComponent } from './sell-policy/add-master-data/add-master-data.component';
import { EditMasterDataComponent } from './sell-policy/edit-master-data/edit-master-data.component';
import { QuoteDetailsComponent } from "./sell-policy/quote-details/quote-details.component";
import { QuoteErrorDetailsComponent } from "./sell-policy/quote-errors.component/quote-errors-component";



@NgModule({
  declarations: [
    QuoteErrorDetailsComponent,
    AppComponent,
    ChangePasswordComponent,
    AppRootComponent,
    LoginComponent,
    SideMenuBarComponent,
    HeaderComponent,
    DashboardComponent,
    UserCreationComponent,
    UserDetailsComponent,
    UserManagementComponent,
    KYCApprovalComponent,
    ApproveKYCComponent,
    RequestDetailsComponent,
    RequestListComponent,
    ReLoginComponent,
    MapPolicyComponent,
    RequestSubmittedDashboardComponent,
    SendQuoteComponent,
    SendPaymentLinkComponent,
    RequestPolicyMappingListComponent,
    RequestMapReviewListComponent,
    PolicyDetailsComponent,
    PolicyListComponent,
    AddVehicleComponent,
    ManageVehiclesComponent,
    ManageMasterDataComponent,
    FixPayoutComponent,
    BulkUploadResultsComponent,
    UserPayoutComponent,
    SellPolicyComponent,
    AddMasterDataComponent,
    EditMasterDataComponent,
    QuoteDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    MatWrapperModule,
    PrimeNgWrapperModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    BsDatepickerModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInjectorInterceptor,
      multi: true,
    },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
