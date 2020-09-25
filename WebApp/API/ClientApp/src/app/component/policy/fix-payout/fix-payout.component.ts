import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PolicyService } from 'src/app/Services/policy.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/Services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fix-payout',
  templateUrl: './fix-payout.component.html',
  styleUrls: ['./fix-payout.component.scss']
})
export class FixPayoutComponent implements OnInit {

  payoutForm;
  errorMessage;
  policy;
  formValid;
  calculatedOnOptions = ['OD', 'Net']
  constructor(private fb: FormBuilder, private policyService: PolicyService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, public userService: UserService) { }

  ngOnInit(): void {
    forkJoin(
      this.policyService.GetPolicyById(this.config.data.id),
      this.policyService.getMasterData(),

    ).subscribe(policy => {
      this.userService.GetUserParentHierarchyById(1004).subscribe(data => {
        console.log(data)
      });
      this.policy = policy;
      this.createForm();
    })

  }

  createForm() {
    this.payoutForm = this.fb.group({
      policyId: null,
      calOn: null,
      payInPercentage: null,
      payOutTo: null,
      payOutPercentage: null,
      payoutAmount: null,
      payoutComment: null
    });
  }

  fixPayout() {
    const payootData = this.payoutForm.getRawValue();
    payootData.payOutTo = 2;
    payootData.payInPercentage = +payootData.payInPercentage;
    payootData.payoutAmount = +payootData.payoutAmount;
    payootData.payOutPercentage = 30;
    payootData.policyId = +this.config.data.id;
    this.policyService.fixPayout(payootData).subscribe(result => {
      debugger;

    })
  }

}
