using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.QuoteModel
{
    public class VehicleDetails
    {

        public string vehicleSubLine { get; set; }
        public string vehicleModelCode { get; set; }
        public string planOpted { get; set; }
        public string yearOfManufacture { get; set; }
        public string voluntaryDeductible { get; set; }
        public string cpaPolicyTerm { get; set; }
        public string discountIdvPercent { get; set; }
        public string vehicleRegDate { get; set; }
        public string vehicleRegisteredInTheNameOf { get; set; }
        public string modelName { get; set; }
        public string registrationNumber { get; set; }
        public string isPreviousPolicyHolder { get; set; }
        public string previousPolicyExpiryDate { get; set; }
        public string productName { get; set; }
        public string carRegisteredCity { get; set; }
        public string isProductCheck { get; set; }
        public string personalAccidentCoverForUnnamedPassengers { get; set; }
        public string accidentCoverForPaidDriver { get; set; }
        public string legalliabilityToPaidDriver { get; set; }
        public string legalliabilityToEmployees { get; set; }
        public string claimsMadeInPreviousPolicy { get; set; }
        public string noClaimBonusPercent { get; set; }
        public string ncbcurrent { get; set; }
        public string claimAmountReceived { get; set; }
        public string claimsReported { get; set; }
        public string ncbprevious { get; set; }
        public string vechileOwnerShipChanged { get; set; }
        public string idv { get; set; }
        public string modifiedIdv { get; set; }
        public string typeOfCover { get; set; }
        public string cpaCoverisRequired { get; set; }
        public CPACoverDetails cpaCoverDetails { get; set; }
    }
}
