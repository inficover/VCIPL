import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { QuoteService } from "../quote-details/Quote-service";

@Component({
    selector: 'app-quote-update-details',
    templateUrl: './update-details.component.html',
    styleUrls: ['./update-details.component.scss']
})
export class UpdateDetailsComponent implements OnInit {

    public quoteMasterData;
    public updateForm;
    makes: Array<any> = [];
    models: Array<any> = [];
    selectedModel = '';
    isDialogOpen = false;
    dialogTitle = 'Dialog';
    errorMessage = '';
    quote;
    carRegisteredCity = '';
    constructor(private fb: FormBuilder, private quoteService: QuoteService) { }
    ngOnInit(): void {
        this.quoteService.getQuoteMasterData(1).subscribe((data) => {
            this.quoteMasterData = data;
        });

        this.updateForm = this.fb.group({
            proposerDetails: this.fb.group({
                title: ['mr', [Validators.required]],
                firstName: [, [Validators.required]],
                lastName: [, [Validators.required]],
                emailId: [, [Validators.required, Validators.email]],
                mobileNo: [, [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
                dateOfBirth: [, [Validators.required]],
                occupation: [, [Validators.required]],
                nomineeName: [, [Validators.required]],
                nomineeAge: [, [Validators.required]],
                relationshipWithNominee: [, [Validators.required]],
                permanentAddress1: [, [Validators.required]],
                permanentAddress2: [, [Validators.required]],
                permanentCity: [, [Validators.required]],
                permanentPincode: [, [Validators.required]],
                sameAdressReg: [, [Validators.required]],
                ResidenceAddressOne: [, [Validators.required]],
                ResidenceAddressTwo: [, [Validators.required]],
                residenceCity: ['', [Validators.required]],
                ResidencePinCode: [, [Validators.required]],
            }),
            vehicleDetails: this.fb.group({
                engineNumber: [, [Validators.required]],
                chassisNumber: [, [Validators.required]],
                isTwoWheelerFinanced: [, [Validators.required]],
                vehicleManufacturerName: [, [Validators.required]],
                modelName: [, [Validators.required]],
                yearOfManufacture: ['', [Validators.required]],
                voluntaryDeductible: ['0', [Validators.required]],
                vehicleMostlyDrivenOn: ['0', [Validators.required]],
                vehicleRegDate: [, [Validators.required]],
                vehicleRegisteredInTheNameOf: ['Individual', [Validators.required]],
                registrationNumber: ['', []],
                productName: ['BrandNewTwowheeler', [Validators.required]],

                rtocity: ['', [Validators.required]],
                accidentCoverForPaidDriver: ['0', [Validators.required]],
                idv: ['0', [Validators.required]],
                cpaCoverisRequired: ['No', [Validators.required]],
                cpaCoverDetails: this.fb.group({
                    noEffectiveDrivingLicense: ['false', [Validators.required]],
                    cpaCoverWithInternalAgent: ['true', [Validators.required]],
                    standalonePAPolicy: ['false', [Validators.required]],
                }),

            }),
            posOpted: ['false', [Validators.required]],
        });

        const rtocity = <FormControl>(this.updateForm.get('vehicleDetails.rtocity'));
        if (rtocity) {
            rtocity.valueChanges.subscribe(selectedValue => {
                const rtoObj = this.quoteMasterData.rtOs.find(rto => rto.rtO_NAME === selectedValue);
                this.carRegisteredCity = rtoObj ? rtoObj.citY_NAME : '';
            });
        }

        const make = <FormControl>(this.updateForm.get('vehicleDetails.make'));
        if (make) {
            make.valueChanges.subscribe(selectedValue => {
                this.populateModels(selectedValue);
            });
        }

        const model = <FormControl>(this.updateForm.get('vehicleDetails.modelName'));
        if (model) {
            model.valueChanges.subscribe(selectedValue => {
                this.setModelCode(selectedValue);
            });
        }
    }
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
        const make = this.updateForm.value.vehicleDetails.make;
        const makemodelObj = this.quoteMasterData.twoWheelerMakeModels.find(obj => obj.make === make && obj.modelName === model);
        this.selectedModel = makemodelObj && makemodelObj.modelCode;
    }
    onSubmit(){
        
    }
    
}
