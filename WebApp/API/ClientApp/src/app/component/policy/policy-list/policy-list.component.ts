import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicyService } from 'src/app/Services/policy.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss']
})
export class PolicyListComponent implements OnInit {

  mode;
  columnDefs: any = [
    { headerName: "Registration No", field: "registrationNo" },
    { headerName: "Policy No", field: "policyNumber" },
    { headerName: "Insured Name", field: "insuredName" },
    { headerName: "Vehicle Type", field: "vehicleType" },
    { headerName: "Make", field: "make" },
    { headerName: "Insurer", field: "insurer" },
    { headerName: "Status", field: "status" },
    { headerName: "Gross Premium", field: "grossPremium" },
    { headerName: "Net Premium", field: "netPremium" },
    { headerName: "OD Premium", field: "odPremium" },
    { headerName: "Broker", field: "broker" }
  ];
  policies;
  masterData;
  searchCritiria;

  constructor(private policyService: PolicyService, public router: Router, public userService: UserService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.initSearchCriteria();
    this.policyService.getMasterData().subscribe(data => {
      this.masterData = data;
    });
    this.mode = this.route.snapshot.queryParams.mode;
    if (this.mode === 'userPolicyList') {
      this.columnDefs.push({
        headerName: "View",
        field: "View"
      });
      this.policyService.GetPoliciesByCreatedUserId(this.userService.loggedInUser.id).subscribe(policies => {
        this.policies = policies;
      });
    } else if (this.mode === 'adminReview') {
      this.columnDefs.push({
        headerName: "Review",
        field: "review"
      });
      this.policyService.GetPoliciesByCriteria({
        StatusList: [2]
      }).subscribe(policies => {
        this.policies = policies;
      });
    }

  }

  NavigateToPolicyDetails(policy, mode) {
    this.router.navigate(["policy", policy.id], { queryParams: { mode: mode } });
  }

  initSearchCriteria() {
    this.searchCritiria = {
      statusList: [],
      vehicleTypeList: []
    };
  }
  Search() {
    this.policyService.GetPoliciesByCriteria(this.searchCritiria).subscribe((policies: any) => {
      this.policies = policies;
    })
  }
  Reset() {
    this.initSearchCriteria();
    this.Search();
  }

}
