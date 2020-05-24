import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { shareReplay } from "rxjs/operators";
import { UserService } from "./user.service";

@Injectable({ providedIn: "root" })
export class RequestService {
  private masterData$;

  constructor(private httpServie: HttpClient, public userSrvc: UserService) {}

  createRequest(request) {
    return this.httpServie.post("/api/Request/CreateRequest", request);
  }

  updateRequest(request) {
    return this.httpServie.post("/api/Request/UpdateRequest", request);
  }

  submitRequest(request) {
    return this.httpServie.post("/api/Request/SubmitRequest", request);
  }

  addComment(comment: any) {
    return this.httpServie.post("/api/Request/AddComments", comment);
  }

  updateComment(comment: any) {
    return this.httpServie.post("/api/Request/UpdateComments", comment);
  }

  getRequestById(requestId) {
    return this.httpServie.get(
      "/api/Request/GetRequestById?requestId=" + requestId
    );
  }

  deleteRequestDocument(requestId, documentId) {
    return this.httpServie.get(
      "/api/Request/deleteRequestDocument?requestId=" + requestId + "&documentId=" + documentId
    );
  }

  getMapPolicyById(mapId) {
    return this.httpServie.get(
      "/api/Request/GetMapPolicyById?requestMapId=" + mapId
    );
  }

  getRequestDocumentbyId(requestId, documentId) {
    return this.httpServie.get(
      "/api/Request/GetRequestDocuments?requestId=" +
        requestId +
        "&documentId=" +
        documentId
    );
  }

  MapPolicyByRequestId(policy) {
    return this.httpServie.post("/api/Request/MapPolicy", policy);
  }

  updateMapPolicy(policy) {
    return this.httpServie.post("/api/Request/UpdateMapPolicy", policy);
  }

  uploadDocuments(fileData: any) {
    return this.httpServie.post("/api/Request/UploadDocument", fileData);
  }

  getMasterData() {
    if (!this.masterData$) {
      this.masterData$ = this.httpServie
        .get("/api/Request/GetRequestMasterData")
        .pipe(shareReplay(1));
    }

    return this.masterData$;
  }

  GetRequestsByCreatedByUser() {
    return this.httpServie.get(
      "/api/Request/GetRequestsByCreatedUser?userID=" +
        this.userSrvc.loggedInUser.id
    );
  }

  GetRequestsByStatus(Sts) {
    return this.httpServie.get("/api/Request/GetRequestByStatus?Status=" + Sts);
  }

  updateRequestStatus(requestId, sts) {
    return this.httpServie.get(
      "/api/Request/ChangeRequestStatus?RequestId=" +
        requestId +
        "&Status=" +
        sts +
        "&UserId=" +
        this.userSrvc.loggedInUser.id
    );
  }
}
