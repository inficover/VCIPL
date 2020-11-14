using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;
using System.Text;


namespace Model.Models.Policy
{
    public class EpplusIgnore : Attribute { }
    //public class DisplayName : Attribute
    //{
    //    private string v;

    //    public DisplayName(string v)
    //    {
    //        this.v = v;
    //    }
    //}
    public class PolicyDetails
    {
        public int Id { get; set; }
        [DataMember(Order = 2)]
        [Description("Vehicle Type")]
        public string VehicleType { get; set; }
        [DataMember(Order = 1)]
        [Description("Policy Type")]
        public string PolicyType { get; set; }
        public DateTime? PolicyIssuenceDate { get; set; }
        public DateTime? RSD { get; set; }
        public DateTime? RED { get; set; }
        public string RegistrationNo { get; set; }
        public string IssueMode { get; set; }
        public bool CPS { get; set; }
        public string PolicyNumber { get; set; }    

        public string Make { get; set; }
        public string Model { get; set; }
        public string Variant { get; set; }
        public string FuelType { get; set; }
        public decimal AddOnPremium { get; set; }
        public string InsuredName { get; set; }
        public string InsuredMobile { get; set; }
        public string Insurer { get; set; }
        public string PaymentMode { get; set; }
        public string PaymentModeOthers { get; set; }
        public decimal ODPremium { get; set; }
        public decimal NetPremium { get; set; }
        public decimal GrossPremium { get; set; }
        public string Broker { get; set; }
        public string Status { get; set; }
        public string CreatedBy { get; set; }

        // Payout details
        public string PayoutCalOn { get; set; }
        public decimal PayInPercentage { get; set; }
        public string PayOutTo { get; set; }
        public decimal PayOutToPercentage { get; set; }
        public decimal PayoutAmount { get; set; }
        [EpplusIgnore]
        public int TotalRecords { get; set; }
        public string PayoutComment { get; set; }
        public string documentLink { get; set; }

    }
}
