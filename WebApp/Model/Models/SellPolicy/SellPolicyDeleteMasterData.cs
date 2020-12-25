using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.SellPolicy
{
    public class SellPolicyDeleteMasterData
    {
        public string MasterDataType{ get; set; }
        public int Id{ get; set; }
    }

    public class SellPolicyUpdateMasterData : SellPolicyDeleteMasterData
    {
        public string NewValue { get; set; }
    }

    public class SellPolicyUpdateUrl
    {
        public string NewUrl { get; set; }
        public int Id { get; set; }
    }
}
