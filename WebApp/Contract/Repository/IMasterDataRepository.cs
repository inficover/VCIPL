using Model.Models.MasterInfo;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Repository
{
    public interface IMasterDataRepository
    {
        Task<QuoteMaster> GetQuoteMasterData(int insurerId);
    }
}
