import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  addVehicleForm: FormGroup;
  formValid: boolean = false;
  makes;
  models;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.getMakes();
  }

  createForm() {
    this.addVehicleForm = this.fb.group({
      makeId: null,
      modelId: null,
      varientName: null,
      newMakeName: null,
      newModelName: null,
    });

    this.addVehicleForm.valueChanges.subscribe(form => {
      this.formValid = false;
      if (!this.addVehicleForm.value.makeId || !this.addVehicleForm.value.modelId || !this.addVehicleForm.value.varientName) {
        return;
      }

      if (this.addVehicleForm.value.makeId === -1) {
        this.formValid = !!this.addVehicleForm.value.newMakeName && !!this.addVehicleForm.value.newModelName
          && !!this.addVehicleForm.value.varientName;
      } else {
        if(this.addVehicleForm.value.modelId === -1) {
          this.formValid = !!this.addVehicleForm.value.newModelName && !!this.addVehicleForm.value.varientName;
        } else {
          this.formValid = !!this.addVehicleForm.value.varientName;
        }
      }
    })
  }

}
