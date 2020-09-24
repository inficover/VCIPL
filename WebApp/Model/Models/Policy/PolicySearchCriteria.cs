using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.Policy
{
    public class PolicySearchCriteria
    {
        public int[] StatusList { get; set; }
        public int[] CreatedByList { get; set; }
        public int[] VehicleTypeList { get; set; }
        public int UserId { get; set; }
    }
}
