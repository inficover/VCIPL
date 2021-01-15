using Contract.Repository;
using Model;
using Model.Entities;
using System;
using Dapper;
using System.Data;
using System.Linq;
using System.Data.SqlClient;
using Common.Helper;
using Model.Models;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Collections.Generic;
using Model.Models.Policy;

namespace Repository
{
    public class PolicyRenewalNotificationsRepository : BaseRepository, IPolicyRenewalNotificationsRepository
    {

        public PolicyRenewalNotificationsRepository(IOptions<DbSettings> dbSettings) : base(dbSettings)
        {
        }

        public async Task<bool> RefreshNotifications(int? userId)
        {
            bool response = true;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("RefreshNotifications",
                            new
                            {
                                userId
                            },
                            commandType: CommandType.StoredProcedure);

                   
                }
                catch (Exception ex)
                {
                    response = false;
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return response;
        }

        public async Task<bool> UpdateNotificationStatus(int[] ids, int status)
        {
            bool response = true;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("UpdatePolicyRenualNotoficationStatus",
                            new
                            {
                                status,
                                IdsList = Converter.CreateDataTable(ids.AsEnumerable()),
                            },
                            commandType: CommandType.StoredProcedure);


                }
                catch (Exception ex)
                {
                    response = false;
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return response;
        }

        public async  Task<List<PolicyRenewalsDetails>> GetPolicyRenewalNotificationByCriteria(int userId)
        {
            List<PolicyRenewalsDetails> resp = new List<PolicyRenewalsDetails>();

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetPolicyRenewalNotificationByCriteria",
                            new
                            {
                               userId
                            },
                            commandType: CommandType.StoredProcedure);
                    var list = await result.ReadAsync<PolicyRenewalsDetails>();
                    resp = list.ToList();
                }
                catch (Exception ex)
                {
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return resp;

        }

    }
}
