using System.Collections.Generic;

namespace Model.Models.Policy
{
    public class PolicyMasterData
    {
        public List<IdNamePair> VehicleType { get; set; }
        public List<IdNamePair> PolicyTypes { get; set; }
        public List<IdNamePair> Makes { get; set; }
        public List<IdNamePair> Models { get; set; }
        public List<IdNamePair> Variants { get; set; }
        public List<IdNamePair> FuelTypes { get; set; }
        public List<IdNamePair> Insurers { get; set; }
        public List<IdNamePair> PaymentModes { get; set; }
        public List<IdNamePair> Brokers { get; set; }
        public List<IdNamePair> PolicyStatus { get; set; }
    }
}
