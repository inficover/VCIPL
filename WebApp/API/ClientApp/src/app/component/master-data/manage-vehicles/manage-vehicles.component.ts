import { Component, OnInit } from '@angular/core';
import { DialogService } from "primeng/dynamicdialog";
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { PolicyService } from 'src/app/Services/policy.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss']
})
export class ManageVehiclesComponent implements OnInit {

  vehicleSearchCriteria = {
    makesList:[],
    modelsList: [],
    varientsList: []
  };
  vehicles;
  masterData= {makes: null, models: null, variants: null};

  columnDefs: any = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Varient", field: "varient" },
    { headerName: "", field: "actions" },

  ];

  constructor(public dialogService: DialogService, public policyService: PolicyService,
    private confirmation: ConfirmationService, public alert: AlertService) { }

  ngOnInit(): void {
    this.policyService.getMasterDataByDataType("Makes").subscribe(makes => {
      this.masterData.makes = makes;
    })
    this.loadVehicles();
  }

  setModels() {
    this.policyService.getMasterDataByDataType("Models", this.vehicleSearchCriteria.makesList[0]).subscribe(models => {
      this.masterData.models = models;
    })
  }

  setVarients() {
    this.policyService.getMasterDataByDataType("Variants", this.vehicleSearchCriteria.modelsList[0]).subscribe(Variants => {
      this.masterData.variants = Variants;
    })
  }

  Search() {
    this.policyService.GetVehiclesByCriteria(this.vehicleSearchCriteria).subscribe(data => {
      this.vehicles = data;
    })
  }

  Reset() {
    this.vehicleSearchCriteria = {
      makesList:[],
      modelsList: [],
      varientsList: []
    };
    this.masterData.models = [];
    this.masterData.variants = [];
    this.Search();
  }

  loadVehicles() {
    this.policyService.GetVehiclesByCriteria(this.vehicleSearchCriteria).subscribe(data => {
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
        this.loadVehicles();
      }
    });

  }

  removeVehicle(vehicle) {
    this.confirmation.confirm({
      key: 'confirm-vehicle-delete',
      message: 'Are you sure you want to delete this vehicle.',
      accept: () => {
        console.log(vehicle);
        this.policyService.deleteVehicle(vehicle.varientId).subscribe(resp => {
          if (resp) {
            this.alert.SuccesMessageAlert('vehicle deleted succesfully!!', "Close");
            this.loadVehicles();
          } else {
            this.alert.FailureMessageAlert("Vehicle delettion failed. Try Again", "Close");
          }
        })
      },
      reject: () => {

      }
    });

  }

}
