using Common.Helper;
using Contract.Repository;
using Dapper;
using Microsoft.Extensions.Options;
using Model.Models.MasterInfo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class MasterDataRepository : BaseRepository, IMasterDataRepository
    {
        public MasterDataRepository(IOptions<DbSettings> dbSettings) : base(dbSettings)
        {
        }

        public async Task<QuoteMaster> GetQuoteMasterData(int insurerId)
        {
            QuoteMaster QuoteObj = new QuoteMaster();
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetQuoteMasterData", new
                    {
                        insurerId = insurerId
                    }, commandType: CommandType.StoredProcedure);

                    var previousInsurers = await result.ReadAsync<PreviousInsurersMaster>();
                    var rtos = await result.ReadAsync<RTOMaster>();
                    var twoWheelerMakeModels = await result.ReadAsync<TwoWheelerMakeModelmaster>();
                    var occupations = await result.ReadAsync<OccupationMaster>();
                    var nominees = await result.ReadAsync<NomineeMaster>();

                    QuoteObj.Nominees = nominees.AsList();
                    QuoteObj.Occupations = occupations.AsList();
                    QuoteObj.PreviousInsurers = previousInsurers.AsList();
                    QuoteObj.RTOs = rtos.AsList();
                    QuoteObj.TwoWheelerMakeModels = twoWheelerMakeModels.AsList();
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

            return QuoteObj;
        }
    }
}
