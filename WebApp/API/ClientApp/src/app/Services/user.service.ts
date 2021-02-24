import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { BehaviorSubject } from "rxjs";
import { tap, shareReplay, map } from "rxjs/operators";
import { AlertService } from "./alert.service";

@Injectable({ providedIn: "root" })
export class UserService {
  loggedInUser;
  IsInBackOfficeRole;
  loggedInUserUpdated$: BehaviorSubject<any> = new BehaviorSubject(null);

  roleCodeMap = {
    1: "AD",
    2: "BO",
    3: "ZM",
    4: "RM",
    5: "AGC",
    6: "AGT"
  };
  private masterData$;

  constructor(private httpServie: HttpClient, private alertService: AlertService) { }

  createUser(user) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/User/CreateUser", user).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  updateUserBasicDetails(user) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/User/updateUserBasicDetails", user).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  updateUSer(user) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/User/UpdateUser", user).pipe(
      tap((updatedUser) => {
        this.alertService.itemsLoading$.next(-1);
        this.loggedInUser = updatedUser;
        this.loggedInUser.code = 'VC' + this.roleCodeMap[this.loggedInUser.roles[0]] + this.loggedInUser.id.paddingZeros(8);
        this.IsInBackOfficeRole = this.loggedInUser.roles[0] === 2;
        this.loggedInUserUpdated$.next(updatedUser);
      })
    );
  }

  login(userName, password) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/User/Login", {
      userName,
      password,
    }).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  GetUserDetailsById(userId) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get("/api/User/GetUserDetailsById?userId=" + userId).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  logout() {
    localStorage.removeItem("UserToken");
  }

  storeUserTokenandDetails(userdetails) {
    localStorage.setItem("UserToken", userdetails.token);
    this.setLoggedinUser(userdetails.token);
  }

  setLoggedinUser(token) {
    const tokenDecoded = jwt_decode(token);
    this.loggedInUser = JSON.parse(tokenDecoded.user);
    this.loggedInUser.code = 'VC' + this.roleCodeMap[this.loggedInUser.roles[0]] + this.loggedInUser.id.paddingZeros(8);
    this.IsInBackOfficeRole = this.loggedInUser.roles[0] === 2;
    this.loggedInUserUpdated$.next(this.loggedInUser);
  }

  getAllUsersCreatedByLoggedInUser() {
    this.alertService.itemsLoading$.next(1);
    let url = "/api/User/GetAllUsersCreatedBy?userID=";
    let id = this.IsInBackOfficeRole ? 1: this.loggedInUser.id;

    return this.httpServie.get(
       url + id
    ).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  getAllUsersCreatedByUser(userId) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get(
      "/api/User/GetAllUsersCreatedBy?userID=" + userId
    ).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  getAllKycPendingUsers() {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get("/api/User/GetAllKycPendingUsers").pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  getMasterData() {
    if (!this.masterData$) {
      this.alertService.itemsLoading$.next(1);
      this.masterData$ = this.httpServie
        .get("/api/User/GetMasterData")
        .pipe(map(data => {
          this.alertService.itemsLoading$.next(-1);
          return data;
        }), shareReplay(1));
    }

    return this.masterData$;
  }

  changePassword(UserData: any) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/User/ChangePassword", UserData).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  uploadDocuments(fileData: any) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/User/UploadKYCDocument", fileData).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  getDocument(name, userId) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get(
      "/api/User/GetUserDocuments?userId=" + userId + "&documentName=" + name
    ).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  setActiveStatus(userId, activeStatus) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get(
      "/api/User/ChangeUserActivation?UserId=" +
      userId +
      "&IsActive=" +
      activeStatus
    ).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  changeUserStatus(userId, status) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get(
      "/api/User/ChangeUserStatus?UserId=" + userId + "&Status=" + status
    ).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  changeUserManager(UserId, managerId) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get(
      "/api/User/ChangeUserManager?UserId=" + UserId + "&managerId=" + managerId
    ).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  getUsersByIds(UserIds) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/User/GetUsersByIds", UserIds).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  GetAllOtherManagers(UserId) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get(
      "/api/User/GetAllOtherManagers?UserId=" + UserId
    ).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  GetUserParentHierarchyById(userId) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get(
      "/api/User/GetUserParentHierarchyById?UserId=" + userId
    ).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  RecordUserPayoutEntry(record) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post('/api/User/RecordUserPayoutEntry', record).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  GetUserPayoutAggregations(userId) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get(
      "/api/User/GetUserPayoutAggregations?UserId=" + userId
    ).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  GetPolicyAggregationsByUserReporties(serachParams) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/User/GetPolicyAggregationsByUserReporties",
      {...serachParams, userId: this.loggedInUser.id }
    ).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

}
