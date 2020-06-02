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
                FuelType = policy.FuelType
            };
        }
        public async Task<Policy> CreatePolicy(Policy policy)
        {
            return await this.SavePolicy("CreatePolicy", this.GetPolicyParams(policy));
        }

        public async Task<Policy> UpdatePolicy(Policy policy)
        {
            return await this.SavePolicy("UpdatePolicy", this.GetPolicyParams(policy));
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
                    //var docEntities = await result.ReadAsync<RequestDocument>();
                    //var commentEntities = await result.ReadAsync<RequestComments>();
                    p = requestEntities.FirstOrDefault();
                    //req.Documents = docEntities.ToList();
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

                    masterData.VehicleTypes = (await result.ReadAsync<VehicleType>()).Cast<IdNamePair>().ToList();
                    masterData.PolicyTypes = (await result.ReadAsync<PolicyTypes>()).Cast<IdNamePair>().ToList();
                    masterData.Makes = (await result.ReadAsync<Makes>()).Cast<IdNamePair>().ToList();
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
    }
}
