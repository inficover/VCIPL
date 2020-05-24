using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models
{
    [Serializable]
    public class RequestComments
    {
        public int Id { get; set; }
        public int RequestId { get; set; }
        public string Comments { get; set; }
        public int CreatedBy { get; set; }
    }
}
