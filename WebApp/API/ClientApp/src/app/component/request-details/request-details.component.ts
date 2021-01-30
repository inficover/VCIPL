import { Component, OnInit, ViewChild } from "@angular/core";
import { RequestService } from "src/app/Services/request.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AlertService } from "src/app/Services/alert.service";
import { UserService } from "src/app/Services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-request-details",
  templateUrl: "./request-details.component.html",
  styleUrls: ["./request-details.component.scss"],
})
export class RequestDetailsComponent implements OnInit {
  requestForm: FormGroup;
  masterData: any;
  uploadCtrl: any;
  requestData: any;
  fileText: any;
  @ViewChild("doc") doc;

  requestType;
  requestTypes = [
    { label: "Request Offline Quote", value: 1 },
    { label: "Direct Policy Issuance", value: 2 },
  ];

  commentId: FormControl = new FormControl();

  constructor(
    public requestService: RequestService,
    public fb: FormBuilder,
    public alert: AlertService,
    private userService: UserService,
    public route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((val: any) => {
      // tslint:disable-next-line: triple-equals
      if (this.route.snapshot.params.id == 0) {
        this.createrequestForm(null);
      } else {
        this.getRequestById(this.route.snapshot.params.id);
      }
    });
    this.getMasterData();
    this.route.params.subscribe((routeParams) => {
      if ((routeParams.id == "0")) {
        this.requestData = null;
        this.createrequestForm(null);
      }
    });
  }

  getRequestById(requestId: any) {
    this.requestService.getRequestById(requestId).subscribe((val: any) => {
      this.requestData = val;
      this.createrequestForm(val);
    });
  }
  getMasterData() {
    this.requestService.getMasterData().subscribe((val: any) => {
      this.masterData = val;
    });
  }
  get() {
    console.log(this.requestType);
  }

  uploadFileHandler(myEvent) {
    if (this.requestForm.controls.id.value) {
      this.uploadFile(myEvent);
    } else {
      const request = this.requestForm.getRawValue();
      delete request.docType;
      delete request.id;
      request.CreatedBy = this.userService.loggedInUser.id;
      request.requestType = Number(request.requestType);
      console.log(request);

      this.requestService.createRequest(request).subscribe((val: any) => {
        this.requestService.getRequestById(val.id).subscribe((req: any) => {
          this.requestData = req;
          this.createrequestForm(req);
          this.uploadFile(myEvent);
        });
      });
    }
  }

  uploadFile(myEvent) {
    const file = myEvent.target.files[0];
    const formData = new FormData();
    formData.append("RequestId", this.requestForm.controls.id.value);
    formData.append("Name", file.name.split(".")[0]);
    formData.append("Type", this.requestForm.controls.docType.value);
    formData.append(
      "FileType",
      file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)
    );

    const reader = new FileReader();

    reader.onload = () => {
      formData.append("DataAsBase64", reader.result.toString());
      console.log(formData);
      this.requestService.uploadDocuments(formData).subscribe((res) => {
        this.fileText = null;
        this.doc.files = null;
        this.getRequestById(this.requestForm.controls.id.value);
      });
    };
    reader.readAsDataURL(file);
  }

  createrequestForm(request) {
    if (request === null) {
      request = {};
      request.registrationDate = new Date();
      request.manufacturingDate = new Date();
      request.policyExpiryDate = new Date();
      request.requestType = "1";
      request.claimTaken = true;
    }

    this.requestForm = this.fb.group({
      requestType: [Number(request.requestType)],
      id: [request.id],
      vehicleType: [request.vehicleType],
      caseType: [request.caseType],
      policyType: [request.policyType],
      registrationNo: [request.registrationNo, Validators.required],
      make: [request.make, Validators.required],
      fuelType: [request.fuelType],
      variant: [request.variant, Validators.required],
      registrationDate: [new Date(request.registrationDate)],
      manufacturingDate: [new Date(request.manufacturingDate)],
      RTO: [request.rto],

      previousInsurer: [request.previousInsurer],
      prefferedIDV: [request.prefferedInsurer],
      addOn: [request.addOn, Validators.required],
      comments: [request.comments],
      docType: [],
      prefferedInsurer: [request.prefferedInsurer],
      policyExpiryDate: [new Date(request.policyExpiryDate)],
      claimTaken: [request.claimTaken, Validators.required],
      discount: [request.discount],
      status: [request.status],
    });
  }

  saveData() {
    const request = this.requestForm.getRawValue();
    delete request.docType;
    request.CreatedBy = this.userService.loggedInUser.id;
    request.requestType = Number(request.requestType);
    console.log(request);
    let method;
    if (request.id) {
      method = "updateRequest";
    } else {
      method = "createRequest";
      delete request.id;
    }
    this.requestService[method](request).subscribe(
      (val: any) => {
        this.getRequestById(val.id);
        this.alert.SuccesMessageAlert("Request Created Succesfully", "Close");
      }
      // error => {
      //   if (error.status === 400) {
      //     this.error = error.error.message;
      //   }
      // }
    );
    // }
  }

  SubmitRequest() {
    const formdata: any = this.requestForm.getRawValue();
    formdata.CreatedBy = this.userService.loggedInUser.id;
    formdata.requestType = Number(formdata.requestType);
    formdata.status = 2;
    let method = "";
    if (formdata.id) {
      method = "updateRequest";
    } else {
      method = "createRequest";
      delete formdata.id;
    }

    if (this.requestForm.valid) {
      if (formdata.id === null || formdata.id === undefined) {
        delete formdata.id;
        this.requestService[method](formdata).subscribe((val: any) => {
          this.alert.SuccesMessageAlert("Request Saved Succesfully", "Close");
          this.requestData = val;
          setTimeout(() => {this.router.navigate(["/requestList"])}, 1000);
        });
      } else {
        this.updateRequest(formdata);
      }
    }
  }

  updateRequest(formdata) {
    this.requestService.submitRequest(formdata).subscribe((val: any) => {
      this.requestData = val;
      this.alert.SuccesMessageAlert("Updated Succesfully", "Close");
      setTimeout(() => {this.router.navigate(["/requestList"])}, 1000);
    });
  }

  setFileName(event) {
    this.fileText = event.target.files[0].name;
  }

  donwloadDocument(doc) {
    this.requestService
      .getRequestDocumentbyId(this.requestData.id, doc.id)
      .subscribe((details: any) => {
        const blob = this.base64ToBlob(
          details[0].dataAsBase64,
          "application/" + details[0].fileType
        );
        window.open(window.URL.createObjectURL(blob));
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

  addComment() {
    const comments: any = {
      Id: this.commentId.value,
      RequestId: this.requestForm.controls.id.value,
      Comments: this.requestForm.controls.comments.value,
      CreatedBy: this.userService.loggedInUser.id,
    };
    this.saveComment(comments);
  }

  saveComment(comments) {
    let method: any;
    if (comments.Id === null) {
      delete comments.Id;
      method = "addComment";
    } else {
      method = "updateComment";
    }
    this.requestService[method](comments).subscribe((val: any) => {
      this.requestData.commentsList = val;
      this.requestForm.controls.comments.reset();
      this.commentId.reset();
    });
  }

  updateComment(i) {
    const data: any = this.requestData.commentsList[i];
    this.requestForm.controls.comments.reset(data.comments);
    this.commentId.reset(data.id);
  }
}
