using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.QuoteModel
{
    public class Quote
    {
        public ProposerDetails proposerDetails { get; set; }
        public VehicleDetails vehicleDetails { get; set; }
        public AuthenticationDetails authenticationDetails { get; set; }
        public string posOpted { get; set; }
    }
}
