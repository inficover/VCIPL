using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.Policy
{
    public class VehicleDetails
    {
        public string Model { get; set; }
        public string Make { get; set; }
        public string Varient { get; set; }
        public string VehicleType { get; set; }

        public int ModelId { get; set; }
        public int VehicleTypeId { get; set; }
        public int MakeId { get; set; }
        public int VarientId { get; set; }

    }
}
