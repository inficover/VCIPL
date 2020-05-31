import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class PolicyService {
  constructor(private httpServie: HttpClient) {}

  createPolicy(policy) {
    return this.httpServie.post("/api/policy/CreatePolicy", policy);
  }

  updatePolicy(policy) {
    return this.httpServie.post("/api/policy/UpdatePolicy", policy);
  }

  getMasterData() {
    return this.httpServie.get("/api/policy/GetPolicyMasterData");
  }
}
