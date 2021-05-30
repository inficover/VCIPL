using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.ResponseModels
{
    public class QuoteResponse
    {
        public Status Status { get; set; }
        public QuoteDetails DATA { get; set; }
    }
}
