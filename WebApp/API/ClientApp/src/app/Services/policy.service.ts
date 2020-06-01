import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PolicyService {
  private masterData$;

  constructor(private httpServie: HttpClient) {}

  createPolicy(policy) {
    return this.httpServie.post("/api/policy/CreatePolicy", policy);
  }

  updatePolicy(policy) {
    return this.httpServie.post("/api/policy/UpdatePolicy", policy);
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
}
