using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models
{
   public class BulkVehicleUpload
    {
        public int Id { get; set; }

        public string VehicleType { get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

        public string Variant { get; set; }
        public string Message { get; set; }
        public int Result { get; set; }

    }
}
