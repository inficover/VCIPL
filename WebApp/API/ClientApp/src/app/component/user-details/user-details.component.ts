import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/Services/user.service";
import { AlertService } from "src/app/Services/alert.service";
import * as mime from "mime-types";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailsComponent implements OnInit {
  UserForm: FormGroup;

  submitted = false;
  Roles: any = [];
  currentUser;
  adharDoc;
  panDoc;
  ChequeLeaf;

  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    public alert: AlertService
  ) {}

  ngOnInit(): void {
    this.SubsribeCurrentUserData();
  }

  SubsribeCurrentUserData() {
    this.userService.loggedInUserUpdated$.subscribe((user: any) => {
      this.userService.GetUserDetailsById(user.id).subscribe((data) => {
        this.CreateBankForm(data);
        this.currentUser = data;
        this.userService.getMasterData().subscribe((masterData: any) => {
          this.Roles = masterData.roles;
        });
        this.setDocuments();
      });
    });
  }

  CreateBankForm(LoginData: any) {
    if (LoginData === null) {
      LoginData = {};
    }
    this.UserForm = this.fb.group({
      id: [LoginData.id, Validators.required],
      name: [LoginData.name, Validators.required],
      userName: [LoginData.userName, Validators.required],
      mailId: [LoginData.mailId, Validators.required],
      mobile: [LoginData.mobile, Validators.required],
      Roles: [LoginData.roles[0], Validators.required],
      // CreatedBy: [LoginData.CreatedBy],
      accountNumber: [
        LoginData.bankAccounts[0]?.accountNumber,
        Validators.required,
      ],
      nameInBank: [LoginData.bankAccounts[0]?.nameInBank],
      ifscCode: [LoginData.bankAccounts[0]?.ifscCode, Validators.required],
      bankName: [LoginData.bankAccounts[0]?.bankName],
      aadhar: [""],
      Pan: [""],
    });
  }

  get form() {
    return this.UserForm.controls;
  }

  submit() {
    if (this.UserForm.valid) {
      this.UpdateUser(true);
    } else {
      this.submitted = true;
    }
  }

  UpdateUser(submit?) {
    const formdata: any = this.UserForm.getRawValue();
    submit
      ? (formdata.Status = 3)
      : (formdata.Status = this.currentUser.status);
    delete formdata.AcNo;
    delete formdata.Name;
    delete formdata.IFSC;
    delete formdata.aadhar;
    delete formdata.Pan;
    formdata.Roles = [formdata.Roles];
    formdata.isActive = this.currentUser.isActive;
    formdata.BankAccounts = [
      {
        accountNumber: this.UserForm.value.accountNumber,
        nameInBank: this.UserForm.value.nameInBank,
        ifscCode: this.UserForm.value.ifscCode,
        bankName: this.UserForm.value.bankName,
      },
    ];
    this.userService.updateUSer(formdata).subscribe((val: any) => {
      this.userService.loggedInUser = val;
      this.userService.loggedInUserUpdated$.next(val);
      this.alert.SuccesMessageAlert("User Updated Succesfully", "Close");
    });
  }

  UploadFile(type, event) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("UserId", this.currentUser.id);
    formData.append("Name", type);
    formData.append("Type", "KYC");
    formData.append("FileType", file.type);

    const reader = new FileReader();

    reader.onload = () => {
      formData.append("DataAsBase64", reader.result.toString());
      this.userService.uploadDocuments(formData).subscribe((res) => {
        const index = this.currentUser.documents.findIndex(
          (d) => d.name === type
        );
        if (index === -1) {
          this.currentUser.documents.push({
            userId: 0,
            name: type,
          });
        } else {
          this.currentUser.documents[index] = {
            userId: 0,
            name: type,
          };
        }
        this.setDocuments();
      });
    };
    reader.readAsDataURL(file);
  }

  setDocuments() {
    this.adharDoc = this.currentUser.documents.find(
      (d) => d.name === "Aadhar"
    );
    this.panDoc = this.currentUser.documents.find((d) => d.name === "PAN");
    this.ChequeLeaf = this.currentUser.documents.find(
      (d) => d.name === "ChequeLeaf"
    );
  }

  donwloadDocument(doc) {
    this.userService
      .getDocument(doc.name, this.currentUser.id)
      .subscribe((details: any) => {
        const blob = this.base64ToBlob(
          details[0].dataAsBase64,
          details[0].fileType
        );
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        const fileName = doc.name + "." + mime.extension(details[0].fileType);
        link.download = fileName;
        link.click();
        document.removeChild(link);
      });
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
}
