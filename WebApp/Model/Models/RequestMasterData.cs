using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models
{
    public class RequestMasterData
    {
        public List<VehicleType> VehicleTypes { get; set; }

        public List<AddOn> AddOns { get; set; }
        public List<CaseType> CaseTypes { get; set; }

        public List<FuelType> FuelTypes { get; set; }

        public List<Make> Makes { get; set; }

        public List<NCBDiscount> NCBDiscounts { get; set; }

        public List<PolicyTypes> PolicyTypes { get; set; }

        public List<PrefferedInsurers> PrefferedInsurers { get; set; }

        public List<PreviousInsurers> PreviousInsurers { get; set; }

        public List<RTO> RTO { get; set; }

        public List<Variants> Variants { get; set; }

        public List<RequestType> RequestTypes { get; set; }
        public List<RequestStatus> RequestStatus { get; set; }
    }
}
