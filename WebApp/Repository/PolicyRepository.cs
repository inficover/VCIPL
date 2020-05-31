using Contract.Repository;
using Common.Helper;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Model.Models.Policy;
using System.Data;
using Dapper;
using System;
using System.Linq;

namespace Repository
{
    public class PolicyRepository : BaseRepository, IPolicyRepository
    {
        public PolicyRepository(IOptions<DbSettings> dbSettings) : base(dbSettings)
        {
        }
        public async Task<Policy> CreatePolicy(Policy Policy)
        {
            return null;
        }

        public async Task<Policy> UpdatePolicy(Policy Policy)
        {
            return null;
        }

        public async Task<Policy> GetPolicyById(int id)
        {
            return null;
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

                   masterData.VehicleType = (await result.ReadAsync<VehicleType>()).Cast<IdNamePair>().ToList();
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
    }
}
