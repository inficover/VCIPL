import { Component, OnInit } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { RequestService } from "src/app/Services/request.service";
import { FormControl } from "@angular/forms";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-send-payment-link",
  templateUrl: "./send-payment-link.component.html",
})
export class SendPaymentLinkComponent implements OnInit {
  comments: any;
  constructor(
    public config: DynamicDialogConfig,
    public requestService: RequestService,
    public userService: UserService,
    public ref: DynamicDialogRef
  ) {}
  ngOnInit() {}

  SaveData() {
    this.updateStatus();
    this.AddComment();
  }
  uploadRequestDocs(fileElement) {
    const file = (fileElement as HTMLInputElement).files[0];
    const formData = new FormData();
    formData.append("RequestId", this.config.data.requestId);
    formData.append("Name", file.name.split(".")[0]);
    formData.append("Type", "Payment");
    formData.append(
      "FileType",
      file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)
    );

    const reader = new FileReader();

    reader.onload = () => {
      formData.append("DataAsBase64", reader.result.toString());
      console.log(formData);
      this.requestService
        .uploadDocuments(formData)
        .subscribe((res) => {});
    };
    reader.readAsDataURL(file);
  }

  updateStatus() {
    this.requestService
      .updateRequestStatus(this.config.data.requestId, 3)
      .subscribe((val: any) => {});
  }

  AddComment() {
    if (!this.comments) {
      this.ref.close(true);
      return;
    }
    const comments: any = {
      RequestId: this.config.data.requestId,
      Comments: "Payment Link ::**" + this.comments,
      CreatedBy: this.userService.loggedInUser.id,
    };
    this.requestService.addComment(comments).subscribe((val: any) => {
      this.ref.close(true);
    });
  }
}
