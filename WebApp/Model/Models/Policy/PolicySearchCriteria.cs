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
        public string VehicleNumber { get; set; }
        public string PolicyNumber { get; set; }
        public int[] PolicyTypesList { get; set; }
        public int[] FuelTypesList { get; set; }
        public string[] IssueModesList { get; set; }

        public string InsuredName { get; set; }
        public string InsuredMobile { get; set; }
        public DateTime? RED_Start { get; set; }
        public DateTime? RED_End { get; set; }
        public DateTime? RSD_Start { get; set; }
        public DateTime? RSD_End { get; set; }
        public int PageSize { get; set;  }
        public int PageNumber { get; set;  }
    }
}
