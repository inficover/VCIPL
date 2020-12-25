import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SellPolicyService } from '../sell-policy.service';

@Component({
  selector: 'app-add-master-data',
  templateUrl: './add-master-data.component.html',
  styleUrls: ['./add-master-data.component.scss']
})
export class AddMasterDataComponent implements OnInit {

  newValues;
  parcedNewValues;
  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, public sellPolicyService : SellPolicyService) { }

  ngOnInit(): void {
  }

  valueChanged(v) {
    this.parcedNewValues = v.replace(/\n/g, ",").split(',');
    this.parcedNewValues.forEach(element => {
      element = element.trim();
    });
    this.parcedNewValues = this.parcedNewValues.filter(element => {
      return element.trim() !== ''
    });
  }

  add(){
    this.sellPolicyService.AddMasterData({
      masterDataType : this.config.data.type,
      parentId: this.config.data.parentId,
      values: this.parcedNewValues
    }).subscribe(data => {
      this.ref.close();
    })
  }

}
