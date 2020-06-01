import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/Services/policy.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {

  policyForm: FormGroup;
  policyData;
  masterData;
  constructor(private policyService: PolicyService, public fb: FormBuilder,
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.policyService.getMasterData().subscribe(data => {
        this.masterData = data;
        if ((routeParams.id == "0")) {
          this.createPolicyForm();
        } else {
          this.policyService.GetPolicyById(routeParams.id).subscribe(policyData => {
            this.policyData = policyData;
            this.createPolicyForm(policyData);
          })
        }
      });
    });
  }

  createPolicyForm(policy?) {
    if (!policy) {
      policy = {}
    }
    this.policyForm = this.fb.group({
      id: [policy.id],
      vehicleType: [policy.vehicleType],
      policyType: [policy.policyType],
      policyIssuenceDate: [policy.policyIssuenceDate],
      registrationNo: [policy.registrationNo],
      make: [policy.make],
      model: [policy.model],
      variant: [policy.variant],
      fuelType: [policy.fuelType],
      addOnPremium: [policy.addOnPremium],
      insuredName: [policy.insuredName],
      insuredMobile: [policy.insuredMobile],
      insurer: [policy.insurer],
      paymentMode: [policy.paymentMode],
      paymentModeOthers: [policy.paymentModeOthers],
      oDPremium: [policy.oDPremium],
      netPremium: [policy.netPremium],
      grossPremium: [policy.grossPremium],
      broker: [policy.broker],
      status: [policy.status],
      createdBy: [policy.createdBy],
    });
  }

  savePolicy() {
    this.policyService.createPolicy(this.policyForm.getRawValue());
  }

}
