using System;
using System.Collections.Generic;
using System.Text;
using Model;
using Model.Models;
using System.Threading.Tasks;
using Model.Models.Policy;
using Microsoft.AspNetCore.Http;

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
        Task<List<VehicleDetails>> GetVehiclesByCriteria(VehicleSearchCriteria criteria);

        Task<Policy> CheckPolicyNumber(int PolicyId, string PolicyNumber);

        Task<AddVehcileResponse> AddVehicle(AddVehicleModel model);
        Task<List<IdNamePair>> GetMasterDataByDataType(string DataType, int ParentId, string filterText);

        Task<bool> DeleteVehicle(int VarientId);
        Task<bool> AddMasterData(string name, string type);
        Task<bool> UpdateMasterData(string name, string type, int id);
        Task<bool> DeleteMasterData(string type, int id);

        List<BulkVehicleUpload> BulkUploadVehicles(IFormFile file);
        List<BulkMasterDataUpload> BulkMasterDataUpload(IFormFile file, string dataType);

    }
}
