import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { BehaviorSubject } from "rxjs";
import { tap, shareReplay } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class UserService {
  loggedInUser;
  loggedInUserUpdated$: BehaviorSubject<any> = new BehaviorSubject(null);

  private masterData$;

  constructor(private httpServie: HttpClient) {}

  createUser(user) {
    return this.httpServie.post("/api/User/CreateUser", user);
  }

  updateUSer(user) {
    return this.httpServie.post("/api/User/UpdateUser", user).pipe(
      tap((updatedUser) => {
        this.loggedInUser = updatedUser;
        this.loggedInUserUpdated$.next(updatedUser);
      })
    );
  }

  login(userName, password) {
    return this.httpServie.post("/api/User/Login", {
      userName,
      password,
    });
  }

  GetUserDetailsById(userId) {
    return this.httpServie.get("/api/User/GetUserDetailsById?userId=" + userId);
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
    this.loggedInUserUpdated$.next(this.loggedInUser);
  }

  getAllUsersCreatedByLoggedInUser() {
    return this.httpServie.get(
      "/api/User/GetAllUsersCreatedBy?userID=" + this.loggedInUser.id
    );
  }

  getAllUsersCreatedByUser(userId) {
    return this.httpServie.get(
      "/api/User/GetAllUsersCreatedBy?userID=" + userId
    );
  }

  getAllKycPendingUsers() {
    return this.httpServie.get("/api/User/GetAllKycPendingUsers");
  }

  getMasterData() {
    if (!this.masterData$) {
      this.masterData$ = this.httpServie
        .get("/api/User/GetMasterData")
        .pipe(shareReplay(1));
    }

    return this.masterData$;
  }

  changePassword(UserData: any) {
    return this.httpServie.post("/api/User/ChangePassword", UserData);
  }

  uploadDocuments(fileData: any) {
    return this.httpServie.post("/api/User/UploadKYCDocument", fileData);
  }

  getDocument(name, userId) {
    return this.httpServie.get(
      "/api/User/GetUserDocuments?userId=" + userId + "&documentName=" + name
    );
  }

  setActiveStatus(userId, activeStatus) {
    return this.httpServie.get(
      "/api/User/ChangeUserActivation?UserId=" +
        userId +
        "&IsActive=" +
        activeStatus
    );
  }

  changeUserStatus(userId, status) {
    return this.httpServie.get(
      "/api/User/ChangeUserStatus?UserId=" + userId + "&Status=" + status
    );
  }

  changeUserManager(UserId, managerId) {
    return this.httpServie.get(
      "/api/User/ChangeUserManager?UserId=" + UserId + "&managerId=" + managerId
    );
  }

  getUsersByIds(UserIds) {
    return this.httpServie.post("/api/User/GetUsersByIds", UserIds);
  }

  GetAllOtherManagers(UserId) {
    return this.httpServie.get(
      "/api/User/GetAllOtherManagers?UserId=" + UserId
    );
  }
}
