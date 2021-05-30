import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MasterData } from 'src/app/Services/masterdata.service';
import { QuoteService } from './Quote-service';
import * as moment from 'moment';
@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.scss']
})
export class QuoteDetailsComponent implements OnInit {
  quoteForm;
  selectedInsurer;
  quoteMasterData;
  makes: Array<any> = [];
  models: Array<any> = [];
  selectedModel = '';
  isDialogOpen = false;
  dialogTitle = 'Dialog';
  errorMessage = '';
  quote;
  constructor(private fb: FormBuilder, private masterData: MasterData, private quoteService: QuoteService) { }

  private populateMakes() {
    let tempMakes = [];
    if (this.quoteMasterData && this.quoteMasterData.twoWheelerMakeModels) {
      tempMakes = this.quoteMasterData.twoWheelerMakeModels.map((makeObj) => { return makeObj.make });
      const makeSet = new Set(tempMakes);
      this.makes = Array.from(makeSet);
    }
  }

  private populateModels(make: string) {
    const templist = this.quoteMasterData.twoWheelerMakeModels.filter(obj => obj.make === make);
    this.models = templist.map(obj => obj.modelName);
  }

  private setModelCode(model: string) {
    const make = this.quoteForm.value.vehicleDetails.make;
    const makemodelObj = this.quoteMasterData.twoWheelerMakeModels.find(obj => obj.make === make && obj.modelName === model);
    this.selectedModel = makemodelObj && makemodelObj.modelCode;
  }

  ngOnInit() {
    this.masterData.getQuoteMasterData(this.selectedInsurer).subscribe((data) => {
      this.quoteMasterData = data;
      this.populateMakes();
    });

    this.quoteForm = this.fb.group({
      proposerDetails: this.fb.group({
        title: ['mr', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        emailId: ['', [Validators.required, Validators.email]],
        mobileNo: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
        dateOfBirth: [, [Validators.required]],
        permanentCity: ['', [Validators.required]],
        residenceCity: ['', [Validators.required]],
      }),
      vehicleDetails: this.fb.group({
        make: [, []],
        modelName: [, []],
        yearOfManufacture: ['', []],
        voluntaryDeductible: ['0', []],
        vehicleRegDate: [, []],
        vehicleRegisteredInTheNameOf: ['Individual', []],
        registrationNumber: ['', []],
        productName: ['BrandNewTwowheeler', []],
        carRegisteredCity: ['', []],
        accidentCoverForPaidDriver: ['0', []],
        idv: ['0', []],
        cpaCoverisRequired: ['No', []],
        cpaCoverDetails: this.fb.group({
          noEffectiveDrivingLicense: ['false', []],
          cpaCoverWithInternalAgent: ['true', []],
          standalonePAPolicy: ['false', []],
        }),

      }),
      posOpted: ['false', []],
    });
    const make = <FormControl>(this.quoteForm.get('vehicleDetails.make'));
    if (make) {
      make.valueChanges.subscribe(selectedValue => {
        this.populateModels(selectedValue);
      });
    }

    const model = <FormControl>(this.quoteForm.get('vehicleDetails.modelName'));
    if (model) {
      model.valueChanges.subscribe(selectedValue => {
        this.setModelCode(selectedValue);
      });
    }
  }
  onSubmit() {
    console.log(this.quoteForm);
    const formData = { ...this.quoteForm.value };
    formData.proposerDetails = { ...this.quoteForm.value.proposerDetails };
    formData.vehicleDetails = { ...this.quoteForm.value.vehicleDetails };
    formData.vehicleDetails.cpaCoverDetails = { ...this.quoteForm.value.vehicleDetails.cpaCoverDetails };
    formData.vehicleDetails.vehicleSubLine = 'motorCycle';
    formData.vehicleDetails.planOpted = 'Flexi Plan';
    formData.vehicleDetails.isPreviousPolicyHolder = 'false';
    formData.vehicleDetails.previousPolicyExpiryDate = '';
    formData.vehicleDetails.isProductCheck = 'true';
    formData.vehicleDetails.personalAccidentCoverForUnnamedPassengers = '0';
    formData.vehicleDetails.legalliabilityToPaidDriver = 'No';
    formData.vehicleDetails.legalliabilityToEmployees = 'Yes';
    formData.vehicleDetails.claimsMadeInPreviousPolicy = 'No';
    formData.vehicleDetails.noClaimBonusPercent = '0';
    formData.vehicleDetails.ncbcurrent = '0';
    formData.vehicleDetails.claimAmountReceived = '0';
    formData.vehicleDetails.claimsReported = '0';
    formData.vehicleDetails.ncbprevious = '0';
    formData.vehicleDetails.vechileOwnerShipChanged = 'no';
    formData.vehicleDetails.discountIdvPercent = '0';
    formData.vehicleDetails.typeOfCover = 'Bundled';
    formData.vehicleDetails.cpaPolicyTerm = '0';
    // formData.vehicleDetails.modelCode = this.selectedModel;
    formData.proposerDetails.dateOfBirth = moment(formData.proposerDetails.dateOfBirth).format('DD/MM/yyyy');
    formData.vehicleDetails.vehicleRegDate = moment(formData.vehicleDetails.vehicleRegDate).format('DD/MM/yyyy');
    formData.proposerDetails.permanentCity = formData.proposerDetails.permanentCity ? formData.proposerDetails.permanentCity.trim() : '';
    formData.proposerDetails.residenceCity = formData.proposerDetails.residenceCity ? formData.proposerDetails.residenceCity.trim() : '';
    formData.vehicleDetails.carRegisteredCity = formData.vehicleDetails.carRegisteredCity ? formData.vehicleDetails.carRegisteredCity.trim() : '';
    formData.vehicleDetails.vehicleModelCode = this.selectedModel;
    formData.posOpted = formData.posOpted ? formData.posOpted.toString() : 'false';
    this.errorMessage = null;
    this.quoteService.getQuote(formData).subscribe((data: any) => {
      if (data && data.premiumdetails && data.premiumdetails.status && data.premiumdetails.status.message &&
        data.premiumdetails.status.message.toLowerCase() !== 'premium calculated and quote saved successfully') {
        this.errorMessage = data.premiumdetails.status.message;
      } else {
        this.quote = data.premiumdetails;
        this.isDialogOpen = true;
      }
    }, (err) => {
      this.errorMessage = 'Something went wrong';
      console.error(err);
    });

  }
}
