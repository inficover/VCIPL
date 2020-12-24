using Contract;
using Contract.Repository;
using Model.Models.SellPolicy;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Manager
{
    public class SellPolicyManager: ISellPolicyManager
    {
        ISellPolicyRepository _sellPolicyRepository;
        public SellPolicyManager(ISellPolicyRepository SellPolicyRepository)
        {
            _sellPolicyRepository = SellPolicyRepository;
        }

        public Task<SellPolicyLinkDetails> CreatePolicyLink(SellPolicyLinkDetails details)
        {
            return _sellPolicyRepository.CreatePolicyLink(details);
        }

        public Task<List<SellPolicyLinkDetails>> GetPolicyLinkByDetails(SellPolicyLinkDetails details)
        {
            return _sellPolicyRepository.GetPolicyLinkByDetails(details);
        }

        public Task<SellPolicyMasterData> GetSellPolicyMaserData()
        {
            return _sellPolicyRepository.GetSellPolicyMaserData();
        }

        public Task<bool> AddMasterData(SellPolicyAddMasterData data)
        {
            return _sellPolicyRepository.AddMasterData(data);
        }
        public Task<bool> DeleteMasterData(SellPolicyDeleteMasterData data)
        {
            return _sellPolicyRepository.DeleteMasterData(data);
        }
        public Task<bool> UpdateMasterData(SellPolicyUpdateMasterData data)
        {
            return _sellPolicyRepository.UpdateMasterData(data);
        }
    }
}
