import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { RequestService } from "src/app/Services/request.service";
import { Router } from "@angular/router";
import { MapPolicyComponent } from "../map-policy/map-policy.component";

@Component({
  selector: "app-request-policy-mapping-list",
  templateUrl: "./request-policy-mapping-list.component.html",
})
export class RequestPolicyMappingListComponent implements OnInit {
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
    this.requestSrvc.GetRequestsByStatus(3).subscribe((requests: any) => {
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

  MapPolicy(req, index) {
    const ref = this.dialogService.open(MapPolicyComponent, {
      data: { request: req },
      header: "Map Policy",
      width: "50%",
    });

    ref.onClose.subscribe((data) => {
      this.requestList.splice(index, 1);
    });
  }
}
