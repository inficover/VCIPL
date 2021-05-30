using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.QuoteModel
{
    public class ProposerDetails
    {
        public string title { get; set; }
        public string firstName { get; set; }
        public string emailId { get; set; }
        public string mobileNo { get; set; }
        public string dateOfBirth { get; set; }
        public string residenceCity { get; set; }
        public string permanentCity { get; set; }

        public string occupation { get; set; }
        public string nomineeName { get; set; }
        public string nomineeAge { get; set; }
        public string relationshipWithNominee { get; set; }
        public string permanentAddress1 { get; set; }
        public string permanentAddress2 { get; set; }
        public string permanentPincode { get; set; }
        public string sameAdressReg { get; set; }
        public string residenceAddressOne { get; set; }
        public string residenceAddressTwo { get; set; }
        public string residencePinCode { get; set; }
    }
}
