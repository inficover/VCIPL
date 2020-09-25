using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.Policy
{
    public class PolicyPayoutDetails
    {
        public int Id { get; set; }
        public int PolicyId { get; set; }
        public string CalOn { get; set; }
        public decimal PayInPercentage { get; set; }
        public int PayOutTo { get; set; }
        public decimal PayOutPercentage { get; set; }
        public decimal PayoutAmount { get; set; }
        public string PayoutComment { get; set; }
    }
}
