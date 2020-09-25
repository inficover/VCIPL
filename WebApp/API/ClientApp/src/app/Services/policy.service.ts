import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { shareReplay } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: "root" })
export class PolicyService {
  private masterData$;

  constructor(private httpServie: HttpClient, private userService: UserService) {}

  createPolicy(policy) {
    return this.httpServie.post("/api/policy/CreatePolicy", policy);
  }

  updatePolicy(policy) {
    return this.httpServie.post("/api/policy/UpdatePolicy", policy);
  }

  changePolicyStatus(id, status) {
    return this.httpServie.get("/api/policy/changePolicyStatus?id=" + id + "&status=" + status+ "&userId=" + this.userService.loggedInUser.id);
  }

  GetPolicyById(id) {
    return this.httpServie.get("/api/policy/GetPolicyById?id=" + id);
  }

  getMasterData() {
    if (!this.masterData$) {
      this.masterData$ = this.httpServie
        .get("/api/policy/GetPolicyMasterData")
        .pipe(shareReplay(1));
    }
    return this.masterData$;
  }

  getMasterDataByDataType(dataType, parentId?, filterText?) {
    let url = "/api/policy/getMasterDataByDataType?dataType=" + dataType;
    if (parentId) {
      url += "&parentId=" + parentId;
    }
    if (filterText) {
      url += "&filtertext=" + filterText;
    }
    return this.httpServie.get(url);
  }

  GetPoliciesByCreatedUserId(userId) {
    return this.httpServie.get("/api/policy/GetPoliciesByCreatedUserId?userId=" + userId);
  }

  GetPoliciesByCriteria(criteria) {
    return this.httpServie.post("/api/policy/GetPoliciesByCriteria", criteria);
  }

  GetVehiclesByCriteria(criteria) {
    return this.httpServie.post("/api/policy/GetVehiclesByCriteria", criteria);
  }

  CheckPolicyNumber(policyId, PolicyNumber) {
    return this.httpServie.get("/api/policy/CheckPolicyNumber?PolicyId=" + policyId + "&PolicyNumber=" + PolicyNumber);
  }

  addVehicle(model) {
    return this.httpServie.post('/api/policy/addVehicle', model);
  }

  deleteVehicle(varientId) {
    return this.httpServie.get('/api/policy/DeleteVehicle?VarientId='+ varientId);
  }

  bulkUploadVehicles(data) {
    return this.httpServie.post("/api/policy/bulkUploadVehicles", data);
  }

  bulkMasterDataUpload(data, dataType) {
    return this.httpServie.post("/api/policy/BulkMasterDataUpload?dataType=" + dataType, data);
  }

  loadMasterDataByDataType(dataType, filtertext?) {
    let url = '/api/policy/loadMasterDataByDataType?dataType='+ dataType;
    if(filtertext) {
      url = url + '&filtertext=' + filtertext;
    }
    return this.httpServie.get(url);
  }

  UpdateMasterData(type, typeId, name) {
    return this.httpServie.get('/api/policy/UpdateMasterData?type='+ type + '&id=' + typeId + '&name=' + name);
  }

  AddMasterData(type, name){
    return this.httpServie.get('/api/policy/AddMasterData?type='+ type +  '&name=' + name);
  }

  DeleteMasterData(type, typeId) {
    return this.httpServie.get('/api/policy/DeleteMasterData?type='+ type + '&typeId=' + typeId);
  }

  fixPayout(data) {
    return this.httpServie.post("/api/policy/FixPayout", data);
  }


}
