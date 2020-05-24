import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user.service";
import { AlertService } from "src/app/Services/alert.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { MasterData } from "src/app/Services/masterdata.service";

@Component({
  selector: "app-approve-kyc",
  templateUrl: "./approve-kyc.component.html",
  styleUrls: ["./approve-kyc.component.scss"]
})
export class ApproveKYCComponent implements OnInit {
  UserInfo: any;

  constructor(
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public alert: AlertService,
    public masterData: MasterData
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.GetUserData(params.id);
    });
  }

  GetUserData(id) {
    this.userService.GetUserDetailsById(id).subscribe((val: any) => {
      this.UserInfo = val;
      this.UserInfo.role = this.masterData.data.roles.find(
        s => s.id === this.UserInfo.roles[0]
      ).roleName;
    });
  }

  donwloadDocument(doc) {
    this.userService
      .getDocument(doc.name, this.UserInfo.id)
      .subscribe((details: any) => {
        const blob = this.base64ToBlob(
          details[0].dataAsBase64,
          "application/" + details[0].fileType
        );
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        const fileName = doc.name + "." + details[0].fileType;
        link.download = fileName;
        link.click();
        document.removeChild(link);
      });
  }

  public base64ToBlob(b64Data, contentType = "", sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, "");
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

  public updateUserStatus(status) {
    this.userService
      .changeUserStatus(this.UserInfo.id, status)
      .subscribe(result => {
        this.alert.SuccesMessageAlert("User Updated Succesfully", "Close");
        this.router.navigateByUrl("/kycApproval");
      });
  }

  goBack() {
    this.router.navigateByUrl("/kycApproval");
  }
}
