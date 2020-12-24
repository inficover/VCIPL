using Model.Models.SellPolicy;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contract.Repository
{
    public interface ISellPolicyRepository
    {
        Task<SellPolicyLinkDetails> CreatePolicyLink(SellPolicyLinkDetails details);
        Task<SellPolicyMasterData> GetSellPolicyMaserData();
        Task<bool> AddMasterData(SellPolicyAddMasterData data);
        Task<bool> DeleteMasterData(SellPolicyDeleteMasterData data);
        Task<bool> UpdateMasterData(SellPolicyUpdateMasterData data);
        Task<List<SellPolicyLinkDetails>> GetPolicyLinkByDetails(SellPolicyLinkDetails details);
    }
}
