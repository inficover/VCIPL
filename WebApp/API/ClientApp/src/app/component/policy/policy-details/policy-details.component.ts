import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/Services/policy.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {

  policyForm: FormGroup;
  policyData;
  masterData;
  pId;
  disabelFields;
  mode;
  constructor(private policyService: PolicyService, public fb: FormBuilder,
    public route: ActivatedRoute, public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.pId = routeParams.id;
      this.mode = this.route.snapshot.queryParams.mode;
      this.policyService.getMasterData().subscribe(data => {
        this.masterData = data;
        if ((routeParams.id == "0")) {
          this.createPolicyForm();
        } else {
          this.policyService.GetPolicyById(routeParams.id).subscribe((policyData: any) => {
            this.policyData = policyData;
            this.disabelFields = this.mode === 'adminReview' || policyData.status === 2 || policyData.status === 3;
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
      odPremium: [policy.odPremium],
      netPremium: [policy.netPremium],
      grossPremium: [policy.grossPremium],
      broker: [policy.broker],
      status: [policy.status],
      createdBy: [policy.createdBy],
    });
  }

  savePolicy(isSubmit?) {
    if (this.pId == '0') {
      const status = isSubmit ? 2 : 1;
      this.policyForm.get('status').setValue(status);
      this.policyForm.get('createdBy').setValue(this.userService.loggedInUser.id);
      this.policyService.createPolicy(this.policyForm.getRawValue()).subscribe();
    } else {
      if(isSubmit) {
        this.policyForm.get('status').setValue(2);
      }
      this.policyService.updatePolicy(this.policyForm.getRawValue()).subscribe();
    }

  }

}
