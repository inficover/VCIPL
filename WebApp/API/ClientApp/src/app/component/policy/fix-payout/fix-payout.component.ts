import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PolicyService } from 'src/app/Services/policy.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/Services/user.service';
import { forkJoin, Observable } from 'rxjs';
import * as maxBy from 'lodash/maxBy'

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
  masterData;
  calculatedOnOptions = ['OD', 'Net']
  payoutToUser: any;
  constructor(private fb: FormBuilder, private policyService: PolicyService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, public userService: UserService) { }

  ngOnInit(): void {
    forkJoin(
      this.policyService.GetPolicyById(this.config.data.id),
      this.policyService.getMasterData(),

    ).subscribe(details => {
      this.policy = details[0];
      this.masterData = details[1];
      this.userService.GetUserParentHierarchyById(this.policy.createdBy).subscribe((data : any) => {
        if(data.length === 1) {
          this.payoutToUser = data[0];
        } else if (data.length > 1){
          this.payoutToUser = maxBy(data, u => u.depth)
        }
      });
      this.createForm();
    })

  }

  createForm() {
    this.payoutForm = this.fb.group({
      policyId: null,
      calOn: [null, Validators.required],
      payInPercentage: [null, Validators.required],
      payOutTo: null,
      payOutPercentage: null,
      payoutAmount: [null, Validators.required],
      payoutComment: null
    });

    this.payoutForm.get('payInPercentage').valueChanges.subscribe(() => {
      this.calculatePayoutAmount();
    });
    this.payoutForm.get('calOn').valueChanges.subscribe(() => {
      this.calculatePayoutAmount();
    });
  }

  calculatePayoutAmount() {
    if(!this.payoutForm.get('payInPercentage').value || !this.payoutForm.value.calOn) {
      return;
    }
    if (this.payoutForm.get('calOn').value == 'OD') {
      this.payoutForm.get('payoutAmount').setValue(
        (this.policy.odPremium * (+this.payoutForm.get('payInPercentage').value/ 100)) *
        (this.payoutToUser.payoutPercentage / 100));
    } else if (this.payoutForm.get('calOn').value == 'Net') {
      this.payoutForm.get('payoutAmount').setValue(
        (this.policy.netPremium * (+this.payoutForm.get('payInPercentage').value/ 100)) *
        (this.payoutToUser.payoutPercentage / 100));
    }
  }

  fixPayout() {
    const payootData = this.payoutForm.getRawValue();
    payootData.payOutTo = this.payoutToUser.id;
    payootData.payInPercentage = +payootData.payInPercentage;
    payootData.payoutAmount = +payootData.payoutAmount;
    payootData.payOutPercentage = this.payoutToUser.payoutPercentage;
    payootData.policyId = +this.config.data.id;
    this.policyService.fixPayout(payootData).subscribe(result => {
      this.ref.close();
    })
  }
}
