using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.Policy
{
    public class Policy
    {
        public int? Id { get; set; }
        public int? VehicleType { get; set; }
        public int? PolicyType { get; set; }
        public DateTime? PolicyIssuenceDate { get; set; }
        public DateTime? RSD { get; set; }
        public DateTime? RED { get; set; }
        public string RegistrationNo { get; set; }
        public string IssueMode{ get; set; }
        public bool CPS{ get; set; }
        public int? Make { get; set; }
        public int? Model { get; set; }
        public int? Variant { get; set; }
        public int? FuelType { get; set; }
        public decimal? AddOnPremium { get; set; }
        public string InsuredName { get; set; }
        public string PolicyNumber { get; set; }
        public string InsuredMobile { get; set; }
        public int? Insurer { get; set; }
        public int? PaymentMode { get; set; }
        public string PaymentModeOthers { get; set; }
        public decimal? ODPremium { get; set; }
        public decimal? NetPremium { get; set; }
        public decimal? GrossPremium { get; set; }
        public int? Broker { get; set; }
        public int? Status { get; set; }
        public int? CreatedBy { get; set; }

        public string Comments { get; set; }
        public List<Document> Documents { get; set; }


    }
}
