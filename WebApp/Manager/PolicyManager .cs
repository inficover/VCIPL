using Contract;
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
            if (criteria.VehicleTypeList == null)
            {
                criteria.VehicleTypeList = new int[] { };
            }
            return await _policyRepository.GetPoliciesByCriteria(criteria);
        }

        public async Task<List<VehicleDetails>> GetVehiclesByCriteria(VehicleSearchCriteria criteria)
        {
            if (criteria.MakesList == null)
            {
                criteria.MakesList = new int[] { };
            }
            if (criteria.ModelsList == null)
            {
                criteria.ModelsList = new int[] { };
            }
            if (criteria.VarientsList == null)
            {
                criteria.VarientsList = new int[] { };
            }
            return await _policyRepository.GetVehiclesByCriteria(criteria);
        }

        public async Task<Policy> CheckPolicyNumber(int PolicyId, string PolicyNumber)
        {
            return await _policyRepository.CheckPolicyNumber(PolicyId, PolicyNumber);
        }

        public async Task<AddVehcileResponse> AddVehicle(AddVehicleModel model)
        {
            return await _policyRepository.AddVehicle(model);
        }

        public async Task<List<IdNamePair>> GetMasterDataByDataType(string DataType, int ParentId)
        {
            return await _policyRepository.GetMasterDataByDataType(DataType, ParentId);
        }
        
    }
}
