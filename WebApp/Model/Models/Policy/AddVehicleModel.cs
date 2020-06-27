using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.Policy
{
    public class AddVehicleModel
    {
        public int MakeID { get; set; }
        public int ModelID { get; set; }
        public string VarientName { get; set; }
        public string NewMakeName { get; set; }
        public string NewModelName { get; set; }
    }

    public class AddVehcileResponse
    {
        public int VechicleId { get; set; }
        public string ErrorMessage { get; set; }
    }
}
