import { Component, OnInit } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { RequestService } from "src/app/Services/request.service";
import { FormControl } from "@angular/forms";
import { UserService } from "src/app/Services/user.service";
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: "app-send-quote",
  templateUrl: "./send-quote.component.html",
  styleUrls: ["./send-quote.component.scss"],
})
export class SendQuoteComponent implements OnInit {
  comments: any;
  files: any = [];
  requestData: any;
  docs: any;
  constructor(
    public config: DynamicDialogConfig,
    public requestService: RequestService,
    public userService: UserService,
    public alert: AlertService,
    public ref: DynamicDialogRef
  ) {}
  ngOnInit() {
    this.getrequestById();
  }

  SaveData() {
    this.updateStatus();
    this.AddComment();
  }

  FileUpload(myEvent) {
    const file = myEvent.target.files[0];
    const formData = new FormData();
    formData.append("RequestId", this.config.data.requestId);
    formData.append("Name", file.name.split(".")[0]);
    formData.append("Type", "Quote");
    formData.append(
      "FileType",
      file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)
    );
    const reader = new FileReader();

    reader.onload = () => {
      formData.append("DataAsBase64", reader.result.toString());
      this.requestService.uploadDocuments(formData).subscribe((res) => {
        this.getrequestById();
      });
    };
    reader.readAsDataURL(file);
  }

  updateStatus() {
    this.requestService
      .updateRequestStatus(this.config.data.requestId, 4)
      .subscribe((val: any) => {});
  }

  AddComment() {
    if (!this.comments) {
      this.ref.close(true);
      return;
    }
    const comments: any = {
      RequestId: this.config.data.requestId,
      Comments: "Quatation ::**" + this.comments,
      CreatedBy: this.userService.loggedInUser.id,
    };
    this.requestService.addComment(comments).subscribe((val: any) => {
      this.ref.close(true);
    });
  }

  getrequestById() {
    this.requestService
      .getRequestById(this.config.data.requestId)
      .subscribe((val: any) => {
        this.requestData = val;
        this.docs = this.requestData.documents.filter(
          (d) => d.type === "Quote"
        );
      });
  }

  deleteDocument(id) {
    this.requestService.deleteRequestDocument(this.config.data.requestId, id).subscribe(() => {
      this.alert.SuccesMessageAlert("Document deleted Succesfully", "Close");
    });
  }
}
