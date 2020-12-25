import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SellPolicyService } from '../sell-policy.service';

@Component({
  selector: 'app-edit-master-data',
  templateUrl: './edit-master-data.component.html',
  styleUrls: ['./edit-master-data.component.scss']
})
export class EditMasterDataComponent implements OnInit {

  constructor(public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, public sellPolicyService: SellPolicyService) {
  }

  columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Actions", field: "actions" }
  ];

  ngOnInit(): void {
  }

  edit(data) {
    this.sellPolicyService.UpdateMasterData({
      masterDataType : this.config.data.type,
      id : data.id,
      NewValue : data.name
    }).subscribe(() => {
      this.ref.close();
    })
  }

  delete(data) {
    this.sellPolicyService.DeleteMasterData({
      masterDataType : this.config.data.type,
      id : data.id,
    }).subscribe(() => {
      this.ref.close();
    })
  }

}
