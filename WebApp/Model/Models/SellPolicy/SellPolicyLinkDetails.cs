using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.SellPolicy
{
    public class SellPolicyLinkDetails
    {
        public int? SegmentId { get; set; }
        public string Segment{ get; set; }

        public int? PolicyTypeId { get; set; }
        public string PolicyType { get; set; }

        public int? BusinessTypeId { get; set; }
        public string BusinessType { get; set; }

        public int? RTO_Id { get; set; }
        public string RTO { get; set; }

        public string URL { get; set; }
        public string Error { get; set; }
    }
}
