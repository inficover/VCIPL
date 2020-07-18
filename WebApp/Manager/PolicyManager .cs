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
            if (criteria.VehicleTypesList == null)
            {
                criteria.VehicleTypesList = new int[] { };
            }
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

        public async Task<List<IdNamePair>> GetMasterDataByDataType(string DataType, int ParentId, string filterText)
        {
            return await _policyRepository.GetMasterDataByDataType(DataType, ParentId, filterText);
        }

        public async Task<bool> DeleteVehicle(int VarientId)
        {
            return await _policyRepository.DeleteVehicle(VarientId);
        }

        public async Task<bool> AddMasterData(string name, string type)
        {
            return await _policyRepository.AddMasterData(name, type);
        }
        public async Task<bool> UpdateMasterData(string name, string type, int id)
        {
            return await _policyRepository.UpdateMasterData(name, type, id);
        }
        public async Task<bool> DeleteMasterData(string type, int id)
        {
            return await _policyRepository.DeleteMasterData(type, id);
        }

    }
}
