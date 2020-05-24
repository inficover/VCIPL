import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { RequestService } from "src/app/Services/request.service";
import { Router } from "@angular/router";
import { SendQuoteComponent } from "../send-quote/send-quote.component";
import { SendPaymentLinkComponent } from "../send-payment-link/send-payment-link.component";

@Component({
  selector: "app-request-map-review-list",
  templateUrl: "./request-map-review-list.component.html",
})
export class RequestMapReviewListComponent implements OnInit {
  gridOptions: any = [];
  requestList: any = [];

  columnDefs: any = [
    { headerName: "Registration No", field: "registrationNo" },
    { headerName: "Vehicle Type", field: "vehicleType" },
    { headerName: "Make/Model", field: "make" },
    {
      headerName: " ",
      field: "Btn",
    },
  ];
  constructor(
    public router: Router,
    public requestService: RequestService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.GetRequests();
  }

  GetRequests() {
    this.requestService.GetRequestsByStatus(6).subscribe((requests: any) => {
      this.requestService.getMasterData().subscribe((masterData: any) => {
        this.getFilteredData(requests, masterData);
      });
    });
  }

  getFilteredData(requestList: any, masterData: any) {
    this.requestList = requestList.filter((val: any) => {
      const index: any = masterData.vehicleTypes.findIndex((vehicle: any) => {
        return val.vehicleType === vehicle.id;
      });
      if (index !== -1) {
        val.vehicleType = masterData.vehicleTypes[index].name;
      }

      const mindex: any = masterData.makes.findIndex((vehicle: any) => {
        return val.make === vehicle.id;
      });
      if (mindex !== -1) {
        val.make = masterData.makes[mindex].name;
      }
      return requestList;
    });
  }

  UpdateStatus(requestId, sts, index) {
    this.requestService
      .updateRequestStatus(requestId, sts)
      .subscribe((val: any) => {
        this.requestList.splice(index, 1);
      });
  }
}
