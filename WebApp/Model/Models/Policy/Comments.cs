using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.Policy
{
    [Serializable]
    public class Comments
    {
        public int Id { get; set; }
        public int RequestId { get; set; }
        public string Comment { get; set; }
        public int CreatedBy { get; set; }
    }
}
