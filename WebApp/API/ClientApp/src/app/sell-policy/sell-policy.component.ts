import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SellPolicyService } from './sell-policy.service';
import { AddMasterDataComponent } from './add-master-data/add-master-data.component'
import { EditMasterDataComponent } from './edit-master-data/edit-master-data.component';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-sell-policy',
  templateUrl: './sell-policy.component.html',
  styleUrls: ['./sell-policy.component.scss']
})
export class SellPolicyComponent implements OnInit {

  masterData = {
    segements: [],
    businessTypes: [],
    policyTypes: [],
    rtOs: []
  };

  addForm = {
    segmentId: undefined,
    PolicyTypeId: null,
    BusinessTypeId: null,
    rto_Id: null,
    url: null
  }

  getUrlForm = {
    segmentId: null,
    PolicyTypeId: null,
    BusinessTypeId: null,
    rto_Id: null,
    url: null
  }

  masterDataMap = {
    segment: this.masterData.segements,
    businesstype: this.masterData.businessTypes,
    policytype: this.masterData.policyTypes,
    rto: this.masterData.rtOs
  };
  isAdmin;

  constructor(public sellPolicyService: SellPolicyService,
    public dialogService: DialogService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.loggedInUser.roles[0] === 1
    this.setUrls();
    this.sellPolicyService.getMasterData().subscribe((data: any) => {
      this.masterData = data;
      this.updateMap();
    });
  }

  updateMap() {
    this.masterDataMap = {
      segment: this.masterData.segements,
      businesstype: this.masterData.businessTypes,
      policytype: this.masterData.policyTypes,
      rto: this.masterData.rtOs
    };
  }

  // segmentChanged(segment) {
  //   if (typeof segment.value === 'string') {
  //     let option = this.Vehiclessegments.find(v => v.name === segment.value);
  //     if (option) {
  //       this.selectedCity = option;
  //     }
  //   }
  // }

  addMasterData(type) {
    const ref = this.dialogService.open(AddMasterDataComponent, {
      data: { type: type },
      header: "Add " + type + "s",
      width: "50%",
    });

    ref.onClose.subscribe((data) => {
      this.sellPolicyService.getMasterData().subscribe((data: any) => {
        this.masterData = data;
        this.updateMap();
      });
    });
  }

  editMasterData(type) {
    const ref = this.dialogService.open(EditMasterDataComponent, {
      data: { type: type, data: this.masterDataMap[type] },
      header: "Manage " + type + "s",
      width: "50%",
    });


    ref.onClose.subscribe((data) => {
      this.sellPolicyService.getMasterData().subscribe((data: any) => this.masterData = data);
    });
  }

  addlink() {
    if (this.addForm.BusinessTypeId && this.addForm.PolicyTypeId && this.addForm.rto_Id && this.addForm.segmentId) {
      this.sellPolicyService.CreatePolicyLink({
        segmentId: this.addForm.segmentId.id,
        PolicyTypeId: this.addForm.PolicyTypeId.id,
        BusinessTypeId: this.addForm.BusinessTypeId.id,
        rto_Id: this.addForm.rto_Id.id,
        url: this.addForm.url
      }).subscribe((data: any) => {
        this.setUrls();
      });
    }
  }

  retriveURL() {
    this.sellPolicyService.GetPolicyLinkByDetails({
      segmentId: this.getUrlForm.segmentId.id,
      PolicyTypeId: this.getUrlForm.PolicyTypeId.id,
      BusinessTypeId: this.getUrlForm.BusinessTypeId.id,
      rto_Id: this.getUrlForm.rto_Id.id
    }).subscribe((data: any) => {
      this.getUrlForm.url = data[0].url;
    });
  }

  setUrls() {
    if (this.addForm.BusinessTypeId && this.addForm.PolicyTypeId && this.addForm.rto_Id && this.addForm.segmentId) {

      this.sellPolicyService.GetPolicyLinkByDetails({
        segmentId: this.addForm.segmentId.id,
        PolicyTypeId: this.addForm.PolicyTypeId.id,
        BusinessTypeId: this.addForm.BusinessTypeId.id,
        rto_Id: this.addForm.rto_Id.id
      }).subscribe((data: any) => {
        console.log(data);
      });
    }
  }
}
