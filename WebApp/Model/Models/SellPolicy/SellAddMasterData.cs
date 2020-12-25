using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.SellPolicy
{
    public class SellPolicyAddMasterData
    {
        public string MasterDataType { get; set; }
        public int? ParentId { get; set; }
        public string[] values { get; set; }
    }
}
