import { Component, OnInit } from '@angular/core';
import { DialogService } from "primeng/dynamicdialog";
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss']
})
export class ManageVehiclesComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }

  addVechicle() {
    const ref = this.dialogService.open(AddVehicleComponent, {
      header: "Add vehicle",
      width: "50%",
    });

    ref.onClose.subscribe((data) => {
      if (data) {
      }
    });

  }

}
