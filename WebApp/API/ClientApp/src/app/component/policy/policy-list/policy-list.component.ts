import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicyService } from 'src/app/Services/policy.service';
import { UserService } from 'src/app/Services/user.service';
import * as cloneDeep from 'lodash/cloneDeep';

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
  policyStatus: any;
  issueModes = [
    {name:'Select',value : null },
    {name:'Offline',value : 'Offline' },
    {name:'Online',value : 'Online' }
  ];
  totalRecords;


  constructor(private policyService: PolicyService, public router: Router, public userService: UserService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.initSearchCriteria();
    this.mode = this.route.snapshot.queryParams.mode;
    this.policyService.getMasterData().subscribe(data => {
      this.masterData = data;
      if (this.mode === 'adminReview') {
        this.policyStatus = this.masterData.policyStatus.filter(p => p.id === 3 || p.id === 4);
      }
    });

    if (this.mode === 'userPolicyList') {
      this.columnDefs.push({
        headerName: "View",
        field: "View"
      });
      this.policyService.GetPoliciesByCriteria(this.searchCritiria).subscribe(policies => {
        this.policies = policies;
        this.totalRecords = policies[0] ? policies[0].totalRecords : 0;
      });
    } else if (this.mode === 'adminReview') {
      this.columnDefs.push({
        headerName: "Review",
        field: "review"
      });
      this.searchCritiria.StatusList = [2];
      this.policyService.GetPoliciesByCriteria(this.searchCritiria).subscribe(policies => {
        this.policies = policies;
        this.totalRecords = policies[0] ? policies[0].totalRecords : 0;
      });
    }

  }

  PageChanged(event) {
    this.searchCritiria.pageNumber = event.page + 1;
    this.searchCritiria.pageSize = event.rows;
    this.Search()
  }

  NavigateToPolicyDetails(policy, mode) {
    this.router.navigate(["policy", policy.id], { queryParams: { mode: mode } });
  }

  initSearchCriteria() {
    this.searchCritiria = {
      statusList: [],
      vehicleTypeList: [],
      userId: this.userService.loggedInUser.id,
      policyTypesList: [],
      fuelTypesList: [],
      issueModesList: [],
      vehicleNumber: null,
      policyNumber: null,
      insuredName: null,
      insuredMobile: null,
      red_Start: null,
      red_End: null,
      rsd_Start: null,
      rsd_End: null,
      pageSize : 1,
      pageNumber :1
    };
  }
  Search() {
    const criteria = cloneDeep(this.searchCritiria);
    if(this.mode === 'adminReview') {
      criteria.statusList = [2];
    }
    this.policyService.GetPoliciesByCriteria(criteria).subscribe((policies: any) => {
      this.policies = policies;
      this.totalRecords = policies[0] ? policies[0].totalRecords : 0;
    })
  }
  Reset() {
    this.initSearchCriteria();
    this.Search();
  }

}
