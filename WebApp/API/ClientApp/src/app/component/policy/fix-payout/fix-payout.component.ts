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
    forkJoin(this.policyService.GetPolicyById(this.config.data.id),this.policyService.getMasterData()).subscribe(policy => {
      this.policy = policy;
      this.createForm();
    })

  }

  createForm() {
    this.payoutForm = this.fb.group({
      policyId: null,
      calculatedOn: null,
      percentage: null,
      actualPayout: null,
      adjustedPayout: null,
      agentPayoutPercentage: null,
      payoutGoesTo: null,
      payoutUserPercentage: null
    });
  }

  fixPayout() {

  }

}
