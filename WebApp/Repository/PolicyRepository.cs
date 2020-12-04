using Contract.Repository;
using Common.Helper;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Model.Models.Policy;
using System.Data;
using Dapper;
using System;
using System.Linq;
using System.Collections.Generic;
using Model.Models;

namespace Repository
{
    public class PolicyRepository : BaseRepository, IPolicyRepository
    {
        public PolicyRepository(IOptions<DbSettings> dbSettings) : base(dbSettings)
        {
        }

        private object GetPolicyParams(Policy policy)
        {
            return new
            {
                AddOnPremium = policy.AddOnPremium,
                Broker = policy.Broker,
                Comments = policy.Comments,
                CreatedBy = policy.CreatedBy,
                GrossPremium = policy.GrossPremium,
                Id = policy.Id,
                InsuredMobile = policy.InsuredMobile,
                InsuredName = policy.InsuredName,
                Insurer = policy.Insurer,
                Make = policy.Make,
                Model = policy.Model,
                Variant = policy.Variant,
                NetPremium = policy.NetPremium,
                ODPremium = policy.ODPremium,
                PaymentMode = policy.PaymentMode,
                PaymentModeOthers = policy.PaymentModeOthers,
                PolicyIssuenceDate = policy.PolicyIssuenceDate,
                PolicyType = policy.PolicyType,
                RegistrationNo = policy.RegistrationNo,
                Status = policy.Status,
                VehicleType = policy.VehicleType,
                FuelType = policy.FuelType,
                PolicyNumber = policy.PolicyNumber,
                RSD = policy.RSD,
                RED = policy.RED,
                CPS = policy.CPS,
                IssueMode = policy.IssueMode
            };
        }
        public async Task<Policy> CreatePolicy(Policy policy)
        {
            var response = await this.SavePolicy("CreatePolicy", this.GetPolicyParams(policy));
            if (policy.Documents != null && policy.Documents.Count > 0)
            {
                var docs = await this.AddDocuments(policy.Documents[0], response.Id);
                response.Documents = docs;
            }
            return response;

        }

        public async Task<List<Model.Models.Policy.Document>> AddDocuments(Model.Models.Policy.Document document, int? policyId)
        {
            List<Model.Models.Policy.Document> documents;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("AddPolicyDocument",
                            new
                            {
                                PolicyId = policyId,
                                DocumentName = document.Name,
                                DocumentType = document.Type,
                                DocumentData = document.Data,
                                FileType = document.FileType
                            },
                            commandType: CommandType.StoredProcedure);

                    var docsEnt = await result.ReadAsync<Model.Models.Policy.Document>();

                    documents = docsEnt.ToList();

                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return documents;
        }

        public async Task<Policy> UpdatePolicy(Policy policy)
        {
            var response = await this.SavePolicy("UpdatePolicy", this.GetPolicyParams(policy));
            if (policy.Documents != null && policy.Documents.Count > 0)
            {
                var docs = await this.AddDocuments(policy.Documents[0], response.Id);
                response.Documents = docs;
            }

            return response;
        }

        public async Task<Policy> SavePolicy(string spName, object param = null)
        {
            Policy p = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync(spName, param, commandType: CommandType.StoredProcedure);
                    var PolicyEntites = await result.ReadAsync<Policy>();
                    p = PolicyEntites.FirstOrDefault();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return p;
        }

        public async Task<Policy> GetPolicyById(int id)
        {
            Policy p = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetPolicyById", new
                    {
                        id = id
                    }, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<Policy>();
                    var docEntities = await result.ReadAsync<Model.Models.Policy.Document>();
                    p = requestEntities.FirstOrDefault();
                    //var commentEntities = await result.ReadAsync<RequestComments>();
                    p.Documents = docEntities.ToList();
                    //req.CommentsList = commentEntities.ToList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return p;
        }

        public async Task<PolicyMasterData> GetPolicyMasterData()
        {
            PolicyMasterData masterData = new PolicyMasterData();

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetPolicyMasterData",
                                                       commandType: CommandType.StoredProcedure);

                    masterData.VehicleTypes = (await result.ReadAsync<Model.Models.Policy.VehicleType>()).Cast<IdNamePair>().ToList();
                    masterData.PolicyTypes = (await result.ReadAsync<Model.Models.Policy.PolicyTypes>()).Cast<IdNamePair>().ToList();
                    masterData.FuelTypes = (await result.ReadAsync<FuelTypes>()).Cast<IdNamePair>().ToList();
                    masterData.Insurers = (await result.ReadAsync<Insurers>()).Cast<IdNamePair>().ToList();
                    masterData.PaymentModes = (await result.ReadAsync<PaymentModes>()).Cast<IdNamePair>().ToList();
                    masterData.Brokers = (await result.ReadAsync<Brokers>()).Cast<IdNamePair>().ToList();
                    masterData.PolicyStatus = (await result.ReadAsync<PolicyStatus>()).Cast<IdNamePair>().ToList();


                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }

                return masterData;
            }
        }

        public async Task<List<PolicyDetails>> GetPoliciesByCreatedUserId(int userId)
        {
            List<PolicyDetails> details = new List<PolicyDetails>();

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetPoliciesByCreatedUserId", new
                    {
                        UserId = userId
                    }, commandType: CommandType.StoredProcedure);
                    var pList = await result.ReadAsync<PolicyDetails>();
                    details = pList.ToList();


                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }

                return details;
            }
        }

        public async Task<bool> ChangePolicyStatus(int id, int status, int userId)
        {
            bool success;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("ChangePolicyStatus", new
                    {
                        Id = id,
                        Status = status,
                        UserId = userId
                    }, commandType: CommandType.StoredProcedure);

                    success = true;


                }
                catch (Exception ex)
                {
                    success = false;

                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }

                return success;
            }
        }
        public async Task<List<PolicyDetails>> GetPoliciesByCriteria(PolicySearchCriteria criteria)
        {
            List<PolicyDetails> details = new List<PolicyDetails>();

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetPoliciesByCriteria", new
                    {
                        CreatedByList = Converter.CreateDataTable(criteria.CreatedByList.AsEnumerable()),
                        StatusList = Converter.CreateDataTable(criteria.StatusList.AsEnumerable()),
                        VehicleTypesList = Converter.CreateDataTable(criteria.VehicleTypeList.AsEnumerable()),
                        criteria.UserId,
                        criteria.DirectReportId,
                        PolicyTypesList = Converter.CreateDataTable(criteria.PolicyTypesList.AsEnumerable()),
                        FuelTypesList = Converter.CreateDataTable(criteria.FuelTypesList.AsEnumerable()),
                        IssueModesList = Converter.CreateDataTable(criteria.IssueModesList.AsEnumerable()),
                        criteria.VehicleNumber,
                        criteria.PolicyNumber,
                        criteria.InsuredName,
                        criteria.InsuredMobile,
                        criteria.RED_Start,
                        criteria.RED_End,
                        criteria.RSD_Start,
                        criteria.RSD_End,
                        criteria.IssueDate_End,
                        criteria.IssueDate_Start,
                        criteria.PageNumber,
                        criteria.PageSize
                    }, commandType: CommandType.StoredProcedure);
                    var pList = await result.ReadAsync<PolicyDetails>();
                    details = pList.ToList();


                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }

                return details;
            }
        }

        public async Task<List<VehicleDetails>> GetVehiclesByCriteria(VehicleSearchCriteria criteria)
        {
            List<VehicleDetails> details = new List<VehicleDetails>();

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetVehiclesByCriteria", new
                    {
                        VehicleTypesList = Converter.CreateDataTable(criteria.VehicleTypesList.AsEnumerable()),
                        MakesList = Converter.CreateDataTable(criteria.MakesList.AsEnumerable()),
                        ModelsList = Converter.CreateDataTable(criteria.ModelsList.AsEnumerable()),
                        VarientsList = Converter.CreateDataTable(criteria.VarientsList.AsEnumerable()),
                       

                    }, commandType: CommandType.StoredProcedure);
                    var pList = await result.ReadAsync<VehicleDetails>();
                    details = pList.ToList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }

                return details;
            }
        }
        public async Task<Policy> CheckPolicyNumber(int PolicyId, string PolicyNumber)
        {
            Policy p = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("CheckPolicyNumber", new
                    {
                        PolicyId = PolicyId,
                        PolicyNumber = PolicyNumber
                    }, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<Policy>();
                    p = requestEntities.FirstOrDefault();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return p;
        }
        public async Task<AddVehcileResponse> AddVehicle(AddVehicleModel model)
        {
            AddVehcileResponse resp;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("AddVehicle", model, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<IdNamePair>();
                    var p = requestEntities.FirstOrDefault();

                    resp = new AddVehcileResponse()
                    {
                        VechicleId = p.Id
                    };
                }
                catch (Exception ex)
                {
                    resp = new AddVehcileResponse()
                    {
                        ErrorMessage = ex.Message
                    };
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return resp;
        }

        public async Task<List<IdNamePair>> GetMasterDataByDataType(string DataType, int ParentId, string filterText)
        {
            List<IdNamePair> resp;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetMasterDataByDataType", new
                    {
                        DataType = DataType,
                        ParentId = ParentId,
                        FilterText = filterText
                    }, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<IdNamePair>();
                    resp = requestEntities.ToList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return resp;
        }

        public async Task<bool> DeleteVehicle(int VarientId)
        {
            bool success;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("DeleteVehicle", new
                    {
                        VarientId = VarientId
                    }, commandType: CommandType.StoredProcedure);

                    success = true;


                }
                catch (Exception ex)
                {
                    success = false;

                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }

                return success;
            }
        }

        public async Task<bool> AddMasterData(string name, string type)
        {
            bool success;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("AddMasterData", new
                    {
                        Name = name,
                        Type = type
                    }, commandType: CommandType.StoredProcedure);

                    success = true;


                }
                catch (Exception ex)
                {
                    success = false;

                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }

                return success;
            }
        }

        public async Task<bool> UpdateMasterData(string name, string type, int id)
        {
            bool success;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("UpdateMasterData", new
                    {
                        Name = name,
                        Type = type,
                        TypeId = id
                    }, commandType: CommandType.StoredProcedure);

                    success = true;


                }
                catch (Exception ex)
                {
                    success = false;

                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }

                return success;
            }
        }

        public async Task<bool> DeleteMasterData(string type, int id)
        {
            bool success;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("DeleteMasterData", new
                    {
                        Type = type,
                        TypeId = id
                    }, commandType: CommandType.StoredProcedure);

                    success = true;


                }
                catch (Exception ex)
                {
                    success = false;

                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }

                return success;
            }
        }


        public async Task<List<BulkVehicleUpload>> BulkUploadVehicles(List<BulkVehicleUpload> data)
        {
            List<BulkVehicleUpload> res = new List<BulkVehicleUpload>();
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("BulkVehicleUpload", new
                    {
                        BulkVehicleAddTable = Converter.CreateDataTable(data.AsEnumerable()),
                    }, commandType: CommandType.StoredProcedure);

                    res = (await result.ReadAsync<BulkVehicleUpload>()).ToList();


                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }


            }
            return res;
        }

        public async Task<List<BulkMasterDataUpload>> BulkMasterDataUpload(List<BulkMasterDataUpload> data, string dataType)
        {
            List<BulkMasterDataUpload> res = new List<BulkMasterDataUpload>();
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("BulkMasterDataUpload", new
                    {
                        Input = Converter.CreateDataTable(data.AsEnumerable()),
                        Type = dataType
                    }, commandType: CommandType.StoredProcedure);

                    res = (await result.ReadAsync<BulkMasterDataUpload>()).ToList();


                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }


            }
            return res;
        }

        public async Task<bool> FixPayout(PolicyPayoutDetails details)
        {
            bool success = false;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("FixPayout", new
                    {
                       details.CalOn,
                       details.PayInPercentage,
                       details.PayoutAmount,
                       details.PayoutComment,
                       details.PayOutPercentage,
                       details.PayOutTo,
                       details.PolicyId
                    }, commandType: CommandType.StoredProcedure);
                    success = true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }


            }
            return success;

        }

    }
}


