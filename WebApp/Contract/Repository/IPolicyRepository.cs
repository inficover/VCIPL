using Model.Models;
using Model.Models.Policy;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Repository
{
    public interface IPolicyRepository
    {
        Task<Policy> CreatePolicy(Policy policy);
        Task<Policy> UpdatePolicy(Policy policy);
        Task<Policy> GetPolicyById(int id);

        Task<PolicyMasterData> GetPolicyMasterData();
    }
}
