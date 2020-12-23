using Model;
using Model.Entities;
using Model.Models;
using Model.Models.SellPolicy;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Repository
{
    public interface ISellPolicyRepository
    {
        Task<SellPolicyLinkDetails> CreatePolicyLink(SellPolicyLinkDetails details);

        Task<List<SellPolicyLinkDetails>> GetPolicyLinkByDetails(SellPolicyLinkDetails details);
    }
}
