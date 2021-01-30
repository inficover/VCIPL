import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { PolicyService } from 'src/app/Services/policy.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { AlertService } from 'src/app/Services/alert.service';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FixPayoutComponent } from '../fix-payout/fix-payout.component';


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
  checkListMismatch = ' ';
  checkListMatch;
  policyExistWithNumberProvided: boolean;
  hasDocuments: boolean;
  hasNewDocuments: boolean;
  documentData: any;
  existingDocumentData: any;
  confirmDocOverrideDialogVisible: boolean;

  @ViewChild('docUpload')
  docUpload: ElementRef;


  statusText = 'Draft';
  pageTitle = "Add policy";
  createdUser: any;


  constructor(private policyService: PolicyService, public fb: FormBuilder,
    public route: ActivatedRoute, public userService: UserService, public alert: AlertService,
    private router: Router, private confirmation: ConfirmationService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.pId = routeParams.id;
      this.mode = this.route.snapshot.queryParams.mode;
      this.policyService.getMasterData().subscribe(data => {
        this.masterData = data;
        if ((routeParams.id == "0")) {
          this.createPolicyForm();
          this.disabelFields = false;
          this.statusText = '';
          this.pageTitle = 'Add Policy';
        } else {
          this.policyService.GetPolicyById(routeParams.id).subscribe((policyData: any) => {
            this.userService.getUsersByIds([policyData.createdBy]).subscribe(users => {
              this.createdUser = users[0];
              this.pageTitle = "Policy# " + policyData.id;
              this.policyData = policyData;
              this.statusText = data.policyStatus.find(s => s.id === policyData.status).name;
              this.disabelFields = this.mode === 'adminReview' || policyData.status === 2 || policyData.status === 3;
              this.createPolicyForm(policyData);
              this.createconfirmPolicyForm({});
            });
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
      policyIssuenceDate: [confirmPolicyForm.policyNumber],
      broker: [confirmPolicyForm.policyNumber]
    });

    this.confirmPolicyForm.valueChanges.subscribe(() => {
      if(this.mode === 'adminReview') {
        this.check();
      }

    })
    if(this.mode === 'adminReview') {
      this.check();
    }
  }

  vehicleTypeChanged() {
    this.policyService.getMasterDataByDataType('Makes', this.policyForm.value.vehicleType).subscribe(makes => {
      this.masterData.makes = makes;
      this.masterData.models = [];
      this.masterData.variants = [];
    })
  }

  makeChanged() {
    this.policyService.getMasterDataByDataType('Models', this.policyForm.value.make).subscribe(data => {
      this.masterData.models = data;
      this.masterData.variants = [];
    })
  }

  modelChanged() {
    this.policyService.getMasterDataByDataType('Variants', this.policyForm.value.model).subscribe(data => {
      this.masterData.variants = data;
    })
  }

  createPolicyForm(policy?) {
    if (!policy) {
      policy = {
        policyIssuenceDate: new Date(),
        red: new Date(),
        rsd: new Date(),
        registeredDate: new Date(),
        cpa : true
      }
      this.setFormValue(policy);
    } else {
      if(policy.vehicleType && policy.vehicleType > 0) {
        this.policyService.getMasterDataByDataType('Makes', policy.vehicleType).subscribe(makes => {
          this.masterData.makes = makes;
        });
      }
      if (policy.make && policy.make > 0) {
        this.policyService.getMasterDataByDataType('Models', policy.make).subscribe(data => {
          this.masterData.models = data;
          if (policy.model && policy.model > 0) {
            this.policyService.getMasterDataByDataType('Variants', policy.model).subscribe(data => {
              this.masterData.variants = data;
            });
            this.setFormValue(policy);
          } else {
            this.setFormValue(policy);
          }
        });

      } else {
        this.setFormValue(policy);
      }

    }


  }

  setFormValue(policy) {
    this.policyForm = this.fb.group({
      id: [policy.id],
      vehicleType: [policy.vehicleType, Validators.required],
      policyType: [policy.policyType, Validators.required],
      policyNumber: [policy.policyNumber, Validators.required],
      policyIssuenceDate: [new Date(policy.policyIssuenceDate), Validators.required],
      rsd: [new Date(policy.rsd), Validators.required],
      red: [new Date(policy.red), Validators.required],
      issueMode: [policy.issueMode, Validators.required],
      registrationNo: [policy.registrationNo, Validators.required],
      registeredDate: [new Date(policy.registeredDate), Validators.required],
      make: [policy.make, Validators.required],
      model: [policy.model],
      cpa: [policy.cpa],
      variant: [policy.variant],
      fuelType: [policy.fuelType, Validators.required],
      addOnPremium: [policy.addOnPremium],
      insuredName: [policy.insuredName, Validators.required],
      insuredMobile: [policy.insuredMobile, Validators.compose([Validators.pattern('[6-9]\\d{9}'), Validators.required])],
      insurer: [policy.insurer, Validators.required],
      paymentMode: [policy.paymentMode, Validators.required],
      paymentModeOthers: [policy.paymentModeOthers],
      odPremium: [policy.odPremium, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,10}(?:\.[0-9]{1,3})?$')])],
      netPremium: [policy.netPremium, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,10}(?:\.[0-9]{1,3})?$')])],
      grossPremium: [policy.grossPremium, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,10}(?:\.[0-9]{1,3})?$')])],
      broker: [policy.broker, Validators.required],
      status: [policy.status],
      createdBy: [policy.createdBy],
      documents: [policy.documents],
      comments: [policy.comments],
      newcomments: [policy.newcomments]
    });

    this.policyForm.get("policyNumber").valueChanges.subscribe(v => {
      if (!v) {
        return;
      }
      let id;
      if (!this.policyForm.value.id) {
        id = 0;
      } else {
        id = this.policyForm.value.id;
      }
      this.policyService.CheckPolicyNumber(id, v).subscribe((p: any) => {

        if (p && p.id !== this.policyForm.value.id) {
          this.policyExistWithNumberProvided = true;
        } else {
          this.policyExistWithNumberProvided = false;
        }
      })
    })

    if (policy && policy.documents && policy.documents.length > 0) {
      this.hasDocuments = true;
      var doc = policy.documents[0];
      this.existingDocumentData = [{
        "Id": doc.id,
        "Name": doc.name,
        "Type": doc.type,
        "FileType": doc.fileType,
        "DataAsBase64": doc.dataAsBase64
      }]
    }
  }

  downloadDocument(newDoc: boolean) {
    var doc = newDoc ? this.documentData[0] : this.existingDocumentData[0];
    if (doc.DataAsBase64.includes(',')) {
      doc.DataAsBase64 = doc.DataAsBase64.substring(doc.DataAsBase64.indexOf(',') + 1);
    }

    const blob = this.base64ToBlob(
      doc.DataAsBase64,
      "application/" + doc.FileType
    );
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    const fileName = doc.Name + "." + doc.FileType;
    link.download = fileName;
    link.click();
    document.removeChild(link);
  }

  public base64ToBlob(b64Data, contentType = "", sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, ""); // IE compatibility...
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  DocumentUpload(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        var doc = {
          "Id": 0,
          "Name": file.name.split(".")[0],
          "Type": "PolicyDocument",
          "FileType": file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length),
          "DataAsBase64": reader.result.toString()
        };

        this.documentData = [doc];

        this.hasNewDocuments = true;

      };
    }
  }


  confirmNewDocUpload(event: any) {
    console.log('confiramtion logged');
    if (this.hasDocuments) {
      if (event.defaultPrevented) return;
      event.preventDefault();

      this.confirmation.confirm({
        key: 'confirm-doc-override',
        message: 'Are you sure you want to override existing policy document',
        accept: () => { this.DocumentUpload(event) },
        reject: () => {
          this.documentData = null;
          this.docUpload.nativeElement.value = "";
        }
      });
    } else {
      this.DocumentUpload(event);
    }
  }

  savePolicy(isSubmit?) {
    const newComments = this.policyForm.get('newcomments').value ? this.policyForm.get('newcomments').value : '';
    const comments = this.policyForm.get('comments').value;
    var commentsConsildated = comments ?
      (comments + (newComments === '' ? '' : ',') + newComments) :
      (newComments);

    this.policyForm.get('comments').setValue(commentsConsildated);
    this.policyForm.get('documents').setValue(this.documentData);

    if (this.pId == '0') {
      const status = isSubmit ? 2 : 1;
      this.policyForm.get('status').setValue(status);
      this.policyForm.get('createdBy').setValue(this.userService.loggedInUser.id);
      var formData = this.policyForm.getRawValue();
      delete formData.newcomments;
      this.policyService.createPolicy(formData).subscribe(res => {
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

  changePolicyStatus(status, proceedPayout?) {

    this.policyService.changePolicyStatus(this.pId, status).subscribe(res => {
      if (res) {
        if (proceedPayout) {
          this.fixPayout();
        } else {
          this.alert.SuccesMessageAlert("Policy reviewd Succesfully", "Close");
          setTimeout(() => this.router.navigate(['submittedPolicies'], { queryParams: { mode: "adminReview" } }), 2000);
        }
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

    if (!!!this.confirmPolicyForm.value.policyIssuenceDate) {
      mismatchList.push('Policy Issuence Date');
    } else if (this.policyForm.value.policyIssuenceDate.toDateString() !== this.confirmPolicyForm.value.policyIssuenceDate.toDateString()) {
      mismatchList.push('Policy Issuence Date');
    }

    if (this.policyForm.value.broker !== this.confirmPolicyForm.value.broker) {
      mismatchList.push('Broker');
    }

    if (mismatchList.length > 0) {
      this.checkListMismatch = mismatchList.toString() + 'values are not mached';
      this.checkListMatch = null;
    } else {
      this.checkListMismatch = null;
      this.checkListMatch = "Check list matched";

    }
  }

  fixPayout() {
    const ref = this.dialogService.open(FixPayoutComponent, {
      header: "Fix payout",
      width: "40%",
      data: {
        id: this.pId,
        policy : this.policyForm.value
      }
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        // this.loadVehicles();
      }
    });
  }

}
