using Model.Models.SellPolicy;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contract.Repository
{
    public interface ISellPolicyRepository
    {
        Task<SellPolicyLinkDetails> CreatePolicyLink(SellPolicyLinkDetails details);
        Task<SellPolicyMasterData> GetMasterDataByParentId(string masterDataType, int parentId);
        Task<bool> AddMasterData(SellPolicyAddMasterData data);
        Task<bool> DeleteMasterData(SellPolicyDeleteMasterData data);

        Task<bool> DeleteLink(int id);
        Task<bool> UpdateLink(int id, string newUrl);
        Task<bool> UpdateMasterData(SellPolicyUpdateMasterData data);
        Task<List<SellPolicyLinkDetails>> GetPolicyLinkByDetails(SellPolicyLinkDetails details);
    }
}
