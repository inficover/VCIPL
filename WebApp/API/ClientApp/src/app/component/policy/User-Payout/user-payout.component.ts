import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PolicyService } from 'src/app/Services/policy.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/Services/user.service';
import { forkJoin, Observable } from 'rxjs';
import * as maxBy from 'lodash/maxBy'

@Component({
  selector: 'app-fix-payout',
  templateUrl: './user-payout.component.html',
  styleUrls: ['./user-payout.component.scss']
})
export class UserPayoutComponent implements OnInit {

  userPayoutForm;
  errorMessage;
  policy;
  userId;
  details;
  transactionTypes = ['BankTransfer', 'Gpay', 'PhonePay', 'Cheque', 'Cash']
  constructor(private fb: FormBuilder, private policyService: PolicyService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, public userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.config.data.user.id;
    this.userService.GetUserPayoutAggregations(this.userId).subscribe((details) => {
      this.details = details;
    });

    this.createForm()
  }

  createForm() {
    this.userPayoutForm = this.fb.group({
      userId: [this.userId, Validators.required],
      amount: [null, Validators.required],
      transactionId: [null, Validators.required],
      transactionComments: null,
      transactionDate: [new Date(), Validators.required],
      transactionType: [null, Validators.required]
    });
  }

  save() {
    const record = this.userPayoutForm.getRawValue();
    record.amount = +record.amount;
    record.transactionType = this.transactionTypes.findIndex(t => t === record.transactionType);
    this.userService.RecordUserPayoutEntry(record).subscribe(data => {
        this.ref.close();
    });
  }

}
