using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models
{
    [Serializable]
    public class RequestMapping
    {
        public int Id { get; set; }
        public int RequestId { get; set; }
        public int PolicyId { get; set; }
        public int GrossValue { get; set; }
        public int NetValue { get; set; }
    }
}
