import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/Services/policy.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {

  policyForm: FormGroup;
  constructor(private policyService: PolicyService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.createPolicyForm();
    this.policyService.getMasterData().subscribe(c=> {});
  }

  createPolicyForm(policy?) {
    if (!policy) {
      policy = {}
    }
    this.policyForm = this.fb.group({
      id: [policy.id],
      vehicleType : [policy.vehicleType],
      policyType : [policy.policyType],
      policyIssuenceDate : [policy.policyIssuenceDate],
      registrationNo : [policy.registrationNo],
      make : [policy.make],
      model : [policy.model],
      variant : [policy.variant],
      fuelType : [policy.fuelType],
      addOnPremium : [policy.addOnPremium],
      insuredName : [policy.insuredName],
      insuredMobile : [policy.insuredMobile],
      insurer : [policy.insurer],
      paymentMode : [policy.paymentMode],
      paymentModeOthers : [policy.paymentModeOthers],
      oDPremium : [policy.oDPremium],
      netPremium : [policy.netPremium],
      grossPremium : [policy.grossPremium],
      broker : [policy.broker],
      status : [policy.status],
      createdBy : [policy.createdBy],
    });
  }

  savePolicy() {
    this.policyService.createPolicy(this.policyForm.getRawValue());
  }

}
