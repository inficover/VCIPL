import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SellPolicyService } from './sell-policy.service';
import { AddMasterDataComponent } from './add-master-data/add-master-data.component'
import { EditMasterDataComponent } from './edit-master-data/edit-master-data.component';
import { UserService } from '../Services/user.service';
import { masterdata } from './sell-policy.enums';

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

  urlNotFound = false;
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
    this.sellPolicyService.GetMasterDataByParentId(masterdata.types.segment).subscribe((data: any) => {
      this.masterData.segements = data.data;
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

  segmentChanged(segment) {
    this.sellPolicyService.GetMasterDataByParentId(masterdata.types.policytype, segment.value.id).subscribe((data: any) => {
      this.masterData.policyTypes = data.data;
      this.updateMap();
    });
  }

  businessTypeChanged(bt) {
    this.sellPolicyService.GetMasterDataByParentId(masterdata.types.rto, bt.value.id).subscribe((data: any) => {
      this.masterData.rtOs = data.data;
      this.updateMap();
    });
  }

  PolicyTypeChanged(pt) {
    this.sellPolicyService.GetMasterDataByParentId(masterdata.types.businesstype, pt.value.id).subscribe((data: any) => {
      this.masterData.businessTypes = data.data;
      this.updateMap();
    });
  }

  getParentIdByType(type) {
    const parentIdMap = {
      segment: {value : null, errorMessage : null, updateMasterDataProp : 'segements'},
      businesstype: {
        value : this.addForm.PolicyTypeId ? this.addForm.PolicyTypeId.id : null,
        errorMessage: 'Select a Policy Type then try',
        updateMasterDataProp : 'businessTypes'
      },
      policytype: {
        value : this.addForm.segmentId ? this.addForm.segmentId.id : null,
        errorMessage: 'Select a Segment then try',
        updateMasterDataProp : 'policyTypes'
      },
      rto: {
        value : this.addForm.BusinessTypeId ? this.addForm.BusinessTypeId.id : null,
        errorMessage: 'Select a Business Type then try',
        updateMasterDataProp : 'rtOs'
      }
    }

    return parentIdMap[type];
  }

  addMasterData(type) {
    const parentDetails = this.getParentIdByType(type);
    if(type !== masterdata.types.segment && parentDetails.value === null) {
      alert(parentDetails.errorMessage);
      return;
    }
    const ref = this.dialogService.open(AddMasterDataComponent, {
      data: { type: type, parentId:  parentDetails.value},
      header: "Add " + type + "s",
      width: "50%",
    });

    ref.onClose.subscribe((data) => {
      this.sellPolicyService.GetMasterDataByParentId(type, parentDetails.value).subscribe((data: any) => {
        this.masterData[parentDetails.updateMasterDataProp] = data.data;
        this.updateMap();
      });
    });
  }

  editMasterData(type) {
    const parentDetails = this.getParentIdByType(type);
    if(type !== masterdata.types.segment && parentDetails.value === null) {
      alert(parentDetails.errorMessage);
      return;
    }
    const ref = this.dialogService.open(EditMasterDataComponent, {
      data: { type: type, data: this.masterDataMap[type] },
      header: "Manage " + type + "s",
      width: "50%",
    });


    ref.onClose.subscribe((data) => {
      this.sellPolicyService.GetMasterDataByParentId(type, parentDetails.value).subscribe((data: any) => {
        this.masterData[parentDetails.updateMasterDataProp] = data.data;
        this.updateMap();
      });
    });
  }

  addlink() {
    if (this.addForm.BusinessTypeId && this.addForm.PolicyTypeId && this.addForm.rto_Id && this.addForm.segmentId && this.addForm.url) {
      this.sellPolicyService.CreatePolicyLink({
        segmentId: this.addForm.segmentId.id,
        PolicyTypeId: this.addForm.PolicyTypeId.id,
        BusinessTypeId: this.addForm.BusinessTypeId.id,
        rto_Id: this.addForm.rto_Id.id,
        url: this.addForm.url
      }).subscribe((data: any) => {
        this.setUrls();
      });
    } else {
      alert ('Please Provide all fields');
    }
  }

  retriveURL() {
    this.sellPolicyService.GetPolicyLinkByDetails({
      segmentId: this.getUrlForm.segmentId.id,
      PolicyTypeId: this.getUrlForm.PolicyTypeId.id,
      BusinessTypeId: this.getUrlForm.BusinessTypeId.id,
      rto_Id: this.getUrlForm.rto_Id.id
    }).subscribe((data: any) => {
      if(data.length > 0) {
        this.getUrlForm.url = data[0].url;
        this.urlNotFound = false;
      } else {
        this.getUrlForm.url = null;
        this.urlNotFound = true;
      }
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
    }  else {
      alert ('Please select all fields');
    }
  }
}
