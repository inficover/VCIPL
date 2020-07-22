import { Component, OnInit } from '@angular/core';
import { DialogService } from "primeng/dynamicdialog";
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { PolicyService } from 'src/app/Services/policy.service';
import { ConfirmationService } from 'primeng/api';
import { AlertService } from 'src/app/Services/alert.service';
import { DocumentHelperService } from 'src/app/Services/document.helper.service';

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss']
})
export class ManageVehiclesComponent implements OnInit {

  vehicleSearchCriteria = {
    makesList: [],
    modelsList: [],
    varientsList: [],
    vehicleTypesList: []
  };
  vehicles;
  masterData = { makes: null, models: null, variants: null, VehiclesTypes: null };

  columnDefs: any = [
    { headerName: "Vehicle Type", field: "vehicleType" },
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Varient", field: "varient" },
    { headerName: "", field: "actions" },

  ];

  constructor(public dialogService: DialogService, public policyService: PolicyService,
    private confirmation: ConfirmationService, public alert: AlertService,
    private dochelper: DocumentHelperService) { }

  ngOnInit(): void {
    this.policyService.getMasterDataByDataType("VehiclesTypes").subscribe(VehiclesTypes => {
      this.masterData.VehiclesTypes = VehiclesTypes;
    })
    this.loadVehicles();
  }

  setMakes() {
    this.policyService.getMasterDataByDataType("Makes", this.vehicleSearchCriteria.vehicleTypesList[0]).subscribe(makes => {
      this.masterData.makes = makes;
    })
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
      makesList: [],
      modelsList: [],
      varientsList: [],
      vehicleTypesList: []
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

  bulkUpload(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = () => {
        let fileToUpload = <File>event.target.files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

        this.policyService.bulkUploadVehicles(formData).subscribe((response: any) => {

          debugger;
          return;
          if (response.data.includes(',')) {
            response.data = response.data.substring(response.data.indexOf(',') + 1);
          }

          const blob = this.dochelper.base64ToBlob(
            response.data,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "masterdta_success.xlsx";
          link.click();
          document.removeChild(link);
        })

      };
    }
  }

}
