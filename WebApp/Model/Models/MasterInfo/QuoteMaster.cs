using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.MasterInfo
{
    public class QuoteMaster
    {
        public IList<NomineeMaster> Nominees { get; set; }
        public IList<OccupationMaster> Occupations { get; set; }
        public IList<PreviousInsurersMaster> PreviousInsurers { get; set; }
        public IList<RTOMaster> RTOs { get; set; }
        public IList<TwoWheelerMakeModelmaster> TwoWheelerMakeModels { get; set; }
    }
}
