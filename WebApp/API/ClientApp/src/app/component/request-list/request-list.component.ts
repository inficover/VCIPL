import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { RequestService } from "src/app/Services/request.service";
import { DialogService } from "primeng/dynamicdialog";
import { MapPolicyComponent } from "../map-policy/map-policy.component";

@Component({
  selector: "app-request-list",
  templateUrl: "./request-list.component.html",
  styleUrls: ["./request-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RequestListComponent implements OnInit {
  gridOptions: any = [];
  requestList: any = [];
  statusMap = {};

  columnDefs: any = [
    { headerName: "Registration No", field: "registrationNo" },
    { headerName: "Vehicle Type", field: "vehicleType" },
    { headerName: "Make/Model", field: "make" },
    { headerName: "Status", field: "status" },
    {
      headerName: "View",
      field: "View"
    },
    // {
    //   headerName: "",
    //   field: "Map Policy"
    // }
  ];
  constructor(
    public router: Router,
    public requestSrvc: RequestService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.requestSrvc.GetRequestsByCreatedByUser().subscribe((requests: any) => {
      this.requestSrvc.getMasterData().subscribe((masterData: any) => {
        this.getFilteredData(requests, masterData);
        masterData.requestStatus.forEach(s => {
          this.statusMap[s.id] = s.name;
        });
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

  NavigateToRequestPage(request) {
    this.router.navigate(["request", request.id]);
  }

  // MapPolicy(req) {
  //   const ref = this.dialogService.open(MapPolicyComponent, {
  //     data: { request: req },
  //     header: "Map Policy",
  //     width: "50%"
  //   });

  //   ref.onClose.subscribe((data) => {
  //     console.log(data);
  //   });
  // }
}
