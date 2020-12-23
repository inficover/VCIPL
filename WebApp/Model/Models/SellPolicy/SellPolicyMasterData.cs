using Model.Models.Policy;
using System.Collections.Generic;

namespace Model.Models.SellPolicy
{
    public class SellPolicyMasterData
    {
        public List<IdNamePair> Segements { get; set; }
        public List<IdNamePair> PolicyTypes { get; set; }
        public List<IdNamePair> BusinessTypes { get; set; }
        public List<IdNamePair> RTOs { get; set; }
    }
}
