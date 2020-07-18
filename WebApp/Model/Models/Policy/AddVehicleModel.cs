using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.Policy
{
    public class AddVehicleModel
    {
        public int MakeId { get; set; }
        public int VehiclesTypeID { get; set; }
        public int ModelId { get; set; }
        public string VarientName { get; set; }
        public string VehiclesTypeName { get; set; }
        public string NewMakeName { get; set; }
        public string NewModelName { get; set; }
    }

    public class AddVehcileResponse
    {
        public int VechicleId { get; set; }
        public string ErrorMessage { get; set; }
    }
}
