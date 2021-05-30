using Contract.Manager;
using Contract.Repository;
using Model.Models.MasterInfo;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Manager
{
    public class MasterDataManager : IMasterDataManager
    {
        IMasterDataRepository repository;
        public MasterDataManager(IMasterDataRepository repo)
        {
            repository = repo;
        }
        public async Task<QuoteMaster> GetQuoteMasterData(int insurerId)
        {
            return await repository.GetQuoteMasterData(insurerId);
        }
    }
}
