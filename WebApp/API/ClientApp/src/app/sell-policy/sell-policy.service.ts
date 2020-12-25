import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SellPolicyService {
  constructor(public httpClient: HttpClient) {

  }

  GetMasterDataByParentId(masterDataType, parentId?) {
    let url = 'api/SellPolicy/GetMasterDataByParentId?masterDataType=' + masterDataType;
    if(parentId) {
      url = url + '&parentId='+ parentId
    }
    return this.httpClient.get(url);
  }

  AddMasterData(data) {
    return this.httpClient.post('api/SellPolicy/AddMasterData/', data);
  }

  DeleteMasterData(data) {
    return this.httpClient.post('api/SellPolicy/DeleteMasterData/', data);
  }

  UpdateMasterData(data) {
    return this.httpClient.post('api/SellPolicy/UpdateMasterData/', data);
  }

  GetPolicyLinkByDetails(data) {
    return this.httpClient.post('api/SellPolicy/GetPolicyLinkByDetails/', data);
  }

  CreatePolicyLink(data) {
    return this.httpClient.post('api/SellPolicy/CreatePolicyLink/', data);
  }
}
