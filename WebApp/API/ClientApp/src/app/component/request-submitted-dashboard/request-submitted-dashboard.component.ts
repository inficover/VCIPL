import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { RequestService } from "src/app/Services/request.service";
import { Router } from "@angular/router";
import { SendQuoteComponent } from "../send-quote/send-quote.component";
import { SendPaymentLinkComponent } from "../send-payment-link/send-payment-link.component";

@Component({
  selector: "app-request-submitted-dashboard",
  templateUrl: "./request-submitted-dashboard.component.html",
  styleUrls: ["./request-submitted-dashboard.component.scss"],
})
export class RequestSubmittedDashboardComponent implements OnInit {
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
    public requestSrvc: RequestService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.requestSrvc.GetRequestsByStatus(2).subscribe((requests: any) => {
      this.requestSrvc.getMasterData().subscribe((masterData: any) => {
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

  SendQuote(reqId, index) {
    console.log(index);
    const ref = this.dialogService.open(SendQuoteComponent, {
      data: { requestId: reqId },
      header: "Send Quote",
      width: "50%",
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        this.loadRequests();
      }
    });
  }

  SendPaymentLink(reqId, index) {
    const ref = this.dialogService.open(SendPaymentLinkComponent, {
      data: { requestId: reqId },
      header: "Send Payment Link",
      width: "50%",
    });

    ref.onClose.subscribe((data) => {
      if (data) {
        this.loadRequests();
      }
    });
  }
}
