import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyService } from 'src/app/Services/policy.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss']
})
export class PolicyListComponent implements OnInit {

  columnDefs: any = [
    { headerName: "Registration No", field: "registrationNo" },
    { headerName: "Vehicle Type", field: "vehicleType" },
    { headerName: "Make", field: "make" },
    { headerName: "Insurer", field: "insurer" },
    { headerName: "Status", field: "status" },
    { headerName: "Gross Premium", field: "grossPremium" },
    { headerName: "Net Premium", field: "netPremium" },
    { headerName: "OD Premium", field: "odPremium" },
    { headerName: "Broker", field: "broker" },
    {
      headerName: "View",
      field: "View"
    },
  ];
  policies;

  constructor(private policyService: PolicyService, public router: Router, public userService: UserService) { }

  ngOnInit() {
    this.policyService.GetPoliciesByCreatedUserId(this.userService.loggedInUser.id).subscribe(policies => {
      this.policies = policies;
    })
  }

  NavigateToPolicyDetails(policy) {
    this.router.navigate(["policy", policy.id], { queryParams: { mode: 'userViewing' } });
  }

}
