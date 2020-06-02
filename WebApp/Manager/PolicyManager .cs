﻿using Contract;
using Contract.Repository;
using Model.Models;
using Model.Models.Policy;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Manager
{
    public class PolicyManager : IPolicyManager
    {
        IPolicyRepository _policyRepository;
        public PolicyManager(IPolicyRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }

        public async Task<Policy> CreatePolicy(Policy Policy)
        {
            return await _policyRepository.CreatePolicy(Policy);
        }

        public async Task<Policy> UpdatePolicy(Policy Policy)
        {
            return await _policyRepository.UpdatePolicy(Policy);
        }

        public async Task<Policy> GetPolicyById(int id)
        {
            return await _policyRepository.GetPolicyById(id);
        }

        public async Task<PolicyMasterData> GetPolicyMasterData()
        {
            return await _policyRepository.GetPolicyMasterData();
        }

        public async Task<List<PolicyDetails>> GetPoliciesByCreatedUserId(int userId)
        {
            return await _policyRepository.GetPoliciesByCreatedUserId(userId);
        }

        public async Task<bool> ChangePolicyStatus(int id, int status, int userId)
        {
            return await _policyRepository.ChangePolicyStatus(id, status, userId);
        }

        public async Task<List<PolicyDetails>> GetPoliciesByCriteria(PolicySearchCriteria criteria)
        {
            if(criteria.StatusList == null)
            {
                criteria.StatusList = new int[] { };
            }
            if (criteria.CreatedByList == null)
            {
                criteria.CreatedByList = new int[] { };
            }
            return await _policyRepository.GetPoliciesByCriteria(criteria);
        }
        

    }
}
