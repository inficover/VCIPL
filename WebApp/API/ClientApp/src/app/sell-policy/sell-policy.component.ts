import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell-policy',
  templateUrl: './sell-policy.component.html',
  styleUrls: ['./sell-policy.component.scss']
})
export class SellPolicyComponent implements OnInit {

  Vehiclessegments;
  selectedCity;
  constructor() { }

  ngOnInit(): void {
    this.Vehiclessegments = [
      {name: 'New York', code: 'NY', inactive: false},
      {name: 'Rome', code: 'RM', inactive: true},
      {name: 'London', code: 'LDN', inactive: false},
      {name: 'Istanbul', code: 'IST', inactive: true},
      {name: 'Paris', code: 'PRS', inactive: false}
  ];
  }

  segmentChanged(segment) {
    if(typeof segment.value === 'string') {
      let option = this.Vehiclessegments.find(v => v.name === segment.value);
      if (option) {
        this.selectedCity = option;
      }
    }
  }

}
