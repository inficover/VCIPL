import { Component, OnInit } from '@angular/core';
import { DialogService } from "primeng/dynamicdialog";
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { PolicyService } from 'src/app/Services/policy.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss']
})
export class ManageVehiclesComponent implements OnInit {

  vehicleSearchCriteria;
  vehicles;

  columnDefs: any = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Varient", field: "varient" },
    { headerName: "", field: "actions" },

  ];

  constructor(public dialogService: DialogService, public policyService: PolicyService, private confirmation: ConfirmationService) { }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles() {
    this.policyService.GetVehiclesByCriteria({
      makeList: []
    }).subscribe(data => {
      this.vehicles = data;
    })
  }

  addVechicle() {
    const ref = this.dialogService.open(AddVehicleComponent, {
      header: "Add vehicle",
      width: "30%",
    });

    ref.onClose.subscribe((data) => {
      if (data) {
      }
    });

  }

  removeVehicle(vehicle) {
    debugger;
    this.confirmation.confirm({
      key: 'confirm-vehicle-delete',
      message: 'Are you sure you want to delete this vehicle.',
      accept: () => {
        console.log(vehicle);
       },
      reject: () => {

      }
    });

  }

}
