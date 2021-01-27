import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/Services/policy.service';
import { AlertService } from 'src/app/Services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-master-data',
  templateUrl: './manage-master-data.component.html',
  styleUrls: ['./manage-master-data.component.scss']
})
export class ManageMasterDataComponent implements OnInit {

  dataType;
  data;
  name;
  filtertext;
  isDialogOpen = false;
  dataTypeMap = {
    'Brokers': 'Brokers',
    'PolicyTypes': 'Policy Types',
    'FuelTypes': 'Fuel Types',
    'Insurers': 'Insurers'
  }

  columnDefs: any = [
    { headerName: "Name", field: "name" },
    { headerName: "", field: "actions" },

  ];
  dialogTitle: any;
  actionType: string;
  currentlyEditingItem: any;


  constructor(private policyService: PolicyService, public alert: AlertService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.dataType = queryParams.dataType;
      this.loadMasterDataByDataType();
    })

  }

  loadMasterDataByDataType(filtertext?) {
    this.policyService.getMasterDataByDataType(this.dataType,null, filtertext).subscribe(data => this.data = data);
  }

  AddMasterData(name) {
    this.policyService.AddMasterData(this.dataType, name).subscribe(res => {
      if (res) {
        this.isDialogOpen = false;
        this.name = null;
        this.alert.SuccesMessageAlert("Created Succesfully", "Close");
      }
    });
  }

  UpdateMasterData() {
    this.policyService.UpdateMasterData(this.dataType, this.currentlyEditingItem.id, this.name).subscribe(res => {
      if (res) {
        this.currentlyEditingItem = null;
        this.isDialogOpen = false;
        this.name = null;
        this.alert.SuccesMessageAlert("updated Succesfully", "Close");
      }
    });;
  }

  DeleteMasterData(id) {
    this.policyService.DeleteMasterData(this.dataType, id).subscribe(res => {
      if (res) {
        this.alert.SuccesMessageAlert("Deleted Succesfully", "Close");
      }
    });;
  }

  openAddItemDialog() {
    this.isDialogOpen = true;
    this.actionType = "Add";
    this.dialogTitle = "Add " + this.dataTypeMap[this.dataType];
  }

  openUpdateItemDialog(item){
    this.currentlyEditingItem = item;
    this.name = item.name;
    this.isDialogOpen = true;
    this.actionType = "Update";
    this.dialogTitle = "Update " + this.dataTypeMap[this.dataType];
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

        this.policyService.bulkMasterDataUpload(formData, this.dataType).subscribe((response: any) => {
          event.target.value = null;
          if(response.errorMessage) {
            this.alert.FailureMessageAlert(response.errorMessage, "Close");
            return;
          }
          return;
        })

      };
    }
  }

  masterDataBulkUploadSample() {
    this.policyService.masterDataBulkUploadSample().subscribe((data: any) => {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(data);
      link.download = "MasterDataBulkUploadSample.xlsx";
      link.click();
    });
  }
}
