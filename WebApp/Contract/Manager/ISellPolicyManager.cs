using System;
using System.Collections.Generic;
using System.Text;
using Model;
using Model.Models;
using System.Threading.Tasks;
using Model.Models.Policy;
using Microsoft.AspNetCore.Http;
using Model.Models.SellPolicy;

namespace Contract
{
    public interface ISellPolicyManager
    {
        Task<SellPolicyLinkDetails> CreatePolicyLink(SellPolicyLinkDetails details);

        Task<List<SellPolicyLinkDetails>> GetPolicyLinkByDetails(SellPolicyLinkDetails details);

    }
}
