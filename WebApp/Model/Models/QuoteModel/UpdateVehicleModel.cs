using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.QuoteModel
{
    public class UpdateVehicleModel
    {
        public String quoteId { get; set; }
        public String premium { get; set; }
        public AuthenticationDetails authenticationDetails { get; set; }
    }
}
