using System;
using System.Collections.Generic;
using System.Text;
using Model;
using Model.Models;
using System.Threading.Tasks;
using Model.Models.Policy;

namespace Contract
{
    public interface IPolicyManager
    {
        Task<Policy> CreatePolicy(Policy policy);
        Task<Policy> UpdatePolicy(Policy policy);
        Task<Policy> GetPolicyById(int id);

        Task<PolicyMasterData> GetPolicyMasterData();
        Task<List<PolicyDetails>> GetPoliciesByCreatedUserId(int userId);

        Task<bool> ChangePolicyStatus(int id, int status, int userId);
        Task<List<PolicyDetails>> GetPoliciesByCriteria(PolicySearchCriteria criteria);
    }
}
