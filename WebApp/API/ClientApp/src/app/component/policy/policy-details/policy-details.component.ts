import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/Services/policy.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {

  policyForm: FormGroup;
  confirmPolicyForm: FormGroup;
  policyData;
  masterData;
  pId;
  disabelFields;
  mode;
  checkListMismatch;
  checkListMatch;
  policyExistWithNumberProvided: boolean;

  constructor(private policyService: PolicyService, public fb: FormBuilder,
    public route: ActivatedRoute, public userService: UserService, public alert: AlertService,
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
            this.createconfirmPolicyForm({});
          })
        }
      });
    });
  }

  createconfirmPolicyForm(confirmPolicyForm) {
    this.confirmPolicyForm = this.fb.group({
      odPremium: [confirmPolicyForm.odPremium],
      netPremium: [confirmPolicyForm.netPremium],
      grossPremium: [confirmPolicyForm.grossPremium],
      policyNumber: [confirmPolicyForm.policyNumber],
    });
  }

  createPolicyForm(policy?) {
    if (!policy) {
      policy = {
        policyIssuenceDate: new Date()
      }
    }
    this.policyForm = this.fb.group({
      id: [policy.id],
      vehicleType: [policy.vehicleType],
      policyType: [policy.policyType],
      policyNumber: [policy.policyNumber],
      policyIssuenceDate: [new Date(policy.policyIssuenceDate)],
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

    this.policyForm.get("policyNumber").valueChanges.subscribe(v => {
      if (!v) {
        return;
      }
      let id;
      if (!this.policyForm.value.id) {
        id = 0;
      }
     this.policyService.CheckPolicyNumber(id, v).subscribe((p:any) => {
       if (p && p.policyNumber !== this.policyForm.value.id) {
         this.policyExistWithNumberProvided = true;
       } else {
         this.policyExistWithNumberProvided = false;
       }
     })

    })
  }

  savePolicy(isSubmit?) {
    if (this.pId == '0') {
      const status = isSubmit ? 2 : 1;
      this.policyForm.get('status').setValue(status);
      this.policyForm.get('createdBy').setValue(this.userService.loggedInUser.id);
      this.policyService.createPolicy(this.policyForm.getRawValue()).subscribe(res => {
        this.alert.SuccesMessageAlert("Policy created Succesfully", "Close");
        setTimeout(() => this.router.navigate(['mypolicies'], { queryParams: { mode: "userPolicyList" } }), 2000);
      });
    } else {
      if (isSubmit) {
        this.policyForm.get('status').setValue(2);
      }
      this.policyService.updatePolicy(this.policyForm.getRawValue()).subscribe(res => {
        this.alert.SuccesMessageAlert("Policy updated Succesfully", "Close");
        setTimeout(() => this.router.navigate(['mypolicies'], { queryParams: { mode: "userPolicyList" } }), 2000);
      });
    }

  }

  changePolicyStatus(status) {

    this.policyService.changePolicyStatus(this.pId, status).subscribe(res => {
      if (res) {
        this.alert.SuccesMessageAlert("Policy reviewd Succesfully", "Close");
        setTimeout(() => this.router.navigate(['submittedPolicies'], { queryParams: { mode: "adminReview" } }), 2000);
      }
    });
  }

  check() {
    const mismatchList = [];
    if (this.policyForm.value.policyNumber !== this.confirmPolicyForm.value.policyNumber) {
      mismatchList.push('Policy Number');
    }
    if (this.policyForm.value.odPremium !== this.confirmPolicyForm.value.odPremium) {
      mismatchList.push('OD Premium');
    }
    if (this.policyForm.value.netPremium !== this.confirmPolicyForm.value.netPremium) {
      mismatchList.push('Net Premium');
    }
    if (this.policyForm.value.grossPremium !== this.confirmPolicyForm.value.grossPremium) {
      mismatchList.push('Gross Premium');
    }

    if (mismatchList.length > 0) {
      this.checkListMismatch = mismatchList.toString() + 'values are not mached';
      this.checkListMatch = null;
    } else {
      this.checkListMismatch = null;
      this.checkListMatch = "Check list matched";

    }
  }

}
