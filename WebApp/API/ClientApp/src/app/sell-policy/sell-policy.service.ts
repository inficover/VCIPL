import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SellPolicyService {
  constructor(public httpClient: HttpClient) {

  }

  getMasterData() {
    return this.httpClient.get('api/SellPolicy/GetSellPolicyMaserData/');
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
