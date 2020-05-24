import { Component, ViewEncapsulation } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { FormGroup, FormBuilder } from "@angular/forms";
import { RequestService } from "src/app/Services/request.service";

@Component({
  selector: "app-map-policy",
  templateUrl: "./map-policy.component.html",
  styleUrls: ["./map-policy.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MapPolicyComponent {
  policyForm: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    public fb: FormBuilder,
    public config: DynamicDialogConfig,
    public requestService: RequestService
  ) {
    if (this.config.data.request?.requestMapID === 0) {
      this.CreatePolicyForm(null);
    } else {
      this.getRequestMapById();
    }
  }

  getRequestMapById() {
    this.requestService
      .getMapPolicyById(this.config.data.request?.requestMapID)
      .subscribe((val: any) => {
        this.CreatePolicyForm(val);
      });
  }

  CreatePolicyForm(policy) {
    if (policy === null) {
      policy = {};
    }
    this.policyForm = this.fb.group({
      id: [this.config.data.request?.requestMapID],
      requestId: [this.config.data.request.id],
      policyId: [policy.policyId],
      grossValue: [policy.grossValue],
      netValue: [policy.netValue],
    });
  }

  MapPolicy() {
    const policy = this.policyForm.getRawValue();
    console.log(policy);
    let method: any;
    if (policy.id === 0) {
      delete policy.id;
      method = "MapPolicyByRequestId";
    } else {
      method = "updateMapPolicy";
    }
    console.log("method", method);
    this.requestService[method](policy).subscribe((val: any) => {
      this.updateStatus();
      this.ref.close(val);
    });
  }
  updateStatus() {
    this.requestService
      .updateRequestStatus(this.policyForm.controls.requestId.value, 6)
      .subscribe((val: any) => {});
  }
}
