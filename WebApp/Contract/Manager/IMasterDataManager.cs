using Model.Models.MasterInfo;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Manager
{
    public interface IMasterDataManager
    {
        Task<QuoteMaster> GetQuoteMasterData(int insurerId);
    }
}
