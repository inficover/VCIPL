# InsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

## https://pkgs.dev.azure.com/dnceng/public/_packaging/dotnet5/nuget/v3/index.json 
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

// ToDOs
// 1. create navigation component and move all nav related code from app component to new one --done
// 2. Create all variables in variables scss file use them all the places where colors are being used --done
// 3. Cleanup variables css file move the global styles to styles.scss file --done
// 4. padding for "sales App" header and toggle icon --done
// 5. Logo place holder to new app-header component --done
// 6. Verical center align for header items --done
// 7. Popover for user profile Icon and add user minimal details --done
// 8. Add routes , create dashboard route and component .. make this default route --done
// 9. create Data Service (Http client wrapper) create a property to show spinner, it should be bheaviral subject
// 10. Create HTTP interseptor to add token to all ouot going requests if token not avaiable/ expired it should redirect to login route
// 11. Add gloabal exception handler
// 12. Create "CoreModule" and move all generic purpose things to this, HTTp interceptor, golbal exception handler, broadcasting service,....
// 13. when side nav in hidden mode , after clicking navigation item it should close --done
// Page heading for both creation and profile gae --done
// Profile rooute click on user profile icon on top right and remove it from left nav --done
// Paddings :: page title and bottom buttons --done
// Button color and it should be on component remove buttons from each step --done
// from validations after only submit

1. User creation:: after save show MatSnackBarConfig bar vertical top horizantal center and clear all fields --done
2. User creation:: when save check username and email already exists :: show red lable below the text box (not done bcoz of mat va;idator issue )
3. Document :: Update styles --done
4. Login, if IsPasswordChangeRequired: true, redirect to changepassword route :: save here will call ChangePassword {
   oldPassword,
   newPassword,
   userId

}--done

5. after succesfull change password redirecto login --done

1) Add name prop to user db/api and UI --Done
2) When get all users - all hirarchy with roles -- pending
3) Change password complete implementation -- Done At API -- done`
4) doc upload and download full functional -- Done at API -- done
5) UI - tree table -- Pending
6) Change user manager mapping
7) User status -- created, registered and KYC Submitted and KYC approved -- DONE AT API
8) User active/de active -- API Done
9) login api pass parent user details along with token -- Done
10) API to get all master data Roles, Status,..... -Done
11) Refactor stylings for doc/upload --Done
12) User active and manager change
13) When user object changes update it fromm all the pages --Done
14) Doc upload:: add upload button for cheque leaf image --Done
15) client side validation for all the forms
16) Once KYC approved by admin user profile should be readonly. Handle changes via admin intervention.
17) Admin role :: user kyc verification
18) App footer:: immediate manager details along with admin contacts
19) Fix :: when clicking on user icon on top right additional pop over is coming up --Done
20) Fix:: Update user not working when there are no back details --api

1. New user :: Role default option to --Select a role-- --done
2. User profile :: Add save button call the same submit method --done
3. Client Side validations :: All forms --done
4. Footer :: Parent--- Phone and email --done
5. Tree table :: material and primeNG
6. KYC Approve :: textbox --> id --> make GetUserDetailsById call--> naviagte to new route "verifyUserKyc" pass this object --> dispaly all user details in new route


Clean up queries
===============================

delete from [dbo].[Request_Documents]

delete from [dbo].[Request_Status_log]

delete from Request_Comments

delete from Request_Mapping

delete from [dbo].[Request]



delete from [dbo].[Policy_Documents]
delete from [dbo].[Policy_Comments]
delete from [dbo].[Policy_Payout]
delete from [dbo].[Policy_Status_log]
delete from [dbo].[PolicyRenewalNotification]
delete from [dbo].[Policy]


delete from [dbo].[User_roles] where userid <>1

delete from [dbo].[User_roles] where userid <>1

delete FROM [dbo].[User_BankAccounts]

delete FROM [dbo].[User_Documents]
delete from [dbo].[Users] where id <> 1

===========================================================

Debug web app
https://vcipl-web.scm.azurewebsites.net/


Bulk upload excel/ Add check box
Add vehicle Type as root in hirarchy
Revisit delete logic

RSD, RED, IssueMode Online/Offline, CPS true/false

Fix the amout in Policy admin review
  Calc on Net/OD
    PayIn
      Fetch Payout percentage for the agent

Review Policy
  add broker filed
  policy issued date



Open Question: Handling advance payment
