using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models
{
    public class Request
    {
        public int Id { get; set; }
        public string RegistrationNo { get; set; }
        public int RequestMapID { get; set; }

        public DateTime? ManufacturingDate { get; set; }
        public DateTime? RegistrationDate { get; set; }
        public DateTime? PolicyExpiryDate { get; set; }
        public string Comments { get; set; }
        public List<RequestComments> CommentsList { get; set; }
        public string PrefferedIDV { get; set; }
        public bool ClaimTaken { get; set; }
        public int? PolicyType { get; set; }
        public int? FuelType { get; set; }
        public int? AddOn { get; set; }
        public int? Make { get; set; }
        public int? Discount { get; set; }
        public int? PreviousInsurer { get; set; }
        public int? PrefferedInsurer { get; set; }
        public int? RTO { get; set; }
        public int? Variant { get; set; }
        public int? VehicleType { get; set; }
        public int? CaseType { get; set; }
        public int? Status { get; set; }

        public int? RequestType { get; set; }
        public int? CreatedBy { get; set; }
        public object MapPolicy { get; set; }
        public List<RequestDocument> Documents { get; set; }
    }
}
