import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from './user.service';
import { AlertService } from "./alert.service";

@Injectable({ providedIn: "root" })
export class PolicyService {
  private masterData$;

  constructor(private httpServie: HttpClient, private userService: UserService, private alertService: AlertService) {}

  createPolicy(policy) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/policy/CreatePolicy", policy).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  updatePolicy(policy) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/policy/UpdatePolicy", policy).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  changePolicyStatus(id, status) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get("/api/policy/changePolicyStatus?id=" + id + "&status=" + status+ "&userId=" + this.userService.loggedInUser.id).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  GetPolicyById(id) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get("/api/policy/GetPolicyById?id=" + id).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  getMasterData() {
    if (!this.masterData$) {
      this.alertService.itemsLoading$.next(1);
      this.masterData$ = this.httpServie
        .get("/api/policy/GetPolicyMasterData")
        .pipe(
          map(data => {
            this.alertService.itemsLoading$.next(-1);
            return data;
          }),
          shareReplay(1)
          );
    }
    return this.masterData$;
  }

  getMasterDataByDataType(dataType, parentId?, filterText?) {
    this.alertService.itemsLoading$.next(1);
    let url = "/api/policy/getMasterDataByDataType?dataType=" + dataType;
    if (parentId) {
      url += "&parentId=" + parentId;
    }
    if (filterText) {
      url += "&filtertext=" + filterText;
    }
    return this.httpServie.get(url).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  // GetPoliciesByCreatedUserId(userId) {
  //   return this.httpServie.get("/api/policy/GetPoliciesByCreatedUserId?userId=" + userId);
  // }

  GetPoliciesByCriteria(criteria) {
    this.alertService.itemsLoading$.next(1);
    if(this.userService.IsInBackOfficeRole) {
      criteria.userId = 1;
    }
    return this.httpServie.post("/api/policy/GetPoliciesByCriteria", criteria).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  ExportPoliciesByCriteria(criteria) {
    this.alertService.itemsLoading$.next(1);
    if(this.userService.IsInBackOfficeRole) {
      criteria.userId = 1;
    }
    return this.httpServie.post("/api/policy/ExportPoliciesByCriteria", criteria, { responseType: 'blob' }).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  GetVehiclesByCriteria(criteria) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/policy/GetVehiclesByCriteria", criteria).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  CheckPolicyNumber(policyId, PolicyNumber) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get("/api/policy/CheckPolicyNumber?PolicyId=" + policyId + "&PolicyNumber=" + PolicyNumber).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  addVehicle(model) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post('/api/policy/addVehicle', model).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  deleteVehicle(varientId) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get('/api/policy/DeleteVehicle?VarientId='+ varientId).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  bulkUploadVehicles(data) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/policy/bulkUploadVehicles", data).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  bulkMasterDataUpload(data, dataType) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/policy/BulkMasterDataUpload?dataType=" + dataType, data).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  loadMasterDataByDataType(dataType, filtertext?) {
    this.alertService.itemsLoading$.next(1);
    let url = '/api/policy/loadMasterDataByDataType?dataType='+ dataType;
    if(filtertext) {
      url = url + '&filtertext=' + filtertext;
    }
    return this.httpServie.get(url).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  UpdateMasterData(type, typeId, name) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get('/api/policy/UpdateMasterData?type='+ type + '&id=' + typeId + '&name=' + name).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  AddMasterData(type, name){
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get('/api/policy/AddMasterData?type='+ type +  '&name=' + name).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  DeleteMasterData(type, typeId) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.get('/api/policy/DeleteMasterData?type='+ type + '&typeId=' + typeId).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  fixPayout(data) {
    this.alertService.itemsLoading$.next(1);
    return this.httpServie.post("/api/policy/FixPayout", data).pipe( map(data => {
      this.alertService.itemsLoading$.next(-1);
      return data;
    }));
  }

  downloadVehcileBulkUploadSample() {
    this.alertService.itemsLoading$.next(1);
   return  this.httpServie.get("/api/policy/downloadVehcileBulkUploadSample", { responseType: 'blob' }).pipe( map(data => {
    this.alertService.itemsLoading$.next(-1);
    return data;
  }));
  }

  masterDataBulkUploadSample() {
    this.alertService.itemsLoading$.next(1);
   return  this.httpServie.get("/api/policy/DownloadMasterDataBulkUploadSample", { responseType: 'blob' }).pipe( map(data => {
    this.alertService.itemsLoading$.next(-1);
    return data;
  }));

  }


}
