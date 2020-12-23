﻿using Common.Helper;
using Contract.Repository;
using Microsoft.Extensions.Options;
using Model.Models.SellPolicy;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using System.Linq;
using Model.Models.Policy;

namespace Repository
{
    class SellPolicyRepository : BaseRepository, ISellPolicyRepository
    {
        public SellPolicyRepository(IOptions<DbSettings> dbSettings) : base(dbSettings)
        {
        }
        public async Task<SellPolicyLinkDetails> CreatePolicyLink(SellPolicyLinkDetails details)
        {
            SellPolicyLinkDetails detailsResponse = null;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("CreatePolicyLink", details , commandType: CommandType.StoredProcedure);
                    var entities = await result.ReadAsync<SellPolicyLinkDetails>();

                    detailsResponse = entities.FirstOrDefault();

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

            return detailsResponse;
        }

        public async Task<List<SellPolicyLinkDetails>> GetPolicyLinkByDetails(SellPolicyLinkDetails details)
        {
            List<SellPolicyLinkDetails> detailsResponse = null;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetPolicyLinkByDetails", details, commandType: CommandType.StoredProcedure);
                    var entities = await result.ReadAsync<SellPolicyLinkDetails>();

                    detailsResponse = entities.ToList();

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

            return detailsResponse;
        }


        public async Task<SellPolicyMasterData> GetSellPolicyMaserData()
        {
            SellPolicyMasterData masterData = new SellPolicyMasterData();
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("SellPolicy_GetMasterData", new { }, commandType: CommandType.StoredProcedure);

                    masterData.Segements = (await result.ReadAsync<IdNamePair>()).Cast<IdNamePair>().ToList();
                    masterData.BusinessTypes = (await result.ReadAsync<IdNamePair>()).Cast<IdNamePair>().ToList();
                    masterData.PolicyTypes = (await result.ReadAsync<IdNamePair>()).Cast<IdNamePair>().ToList();
                    masterData.RTOs = (await result.ReadAsync<IdNamePair>()).Cast<IdNamePair>().ToList();
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

            return masterData;
        }

        public async Task<bool> AddMasterData(SellPolicyAddMasterData data)
        {
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("SellPolicy_AddMasterData",
                        new { 
                            data.MasterDataType,
                            values = Converter.CreateDataTable(data.values.AsEnumerable()),
                        }, commandType: CommandType.StoredProcedure);
                }
                catch (Exception ex)
                {
                    return false;
                }
                finally
                {
                    dbConnection.Close();
                }
            }
            return true;
        }
    }
}
