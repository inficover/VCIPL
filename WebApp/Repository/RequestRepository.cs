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
using System.Dynamic;

namespace Repository
{
    public class RequestRepository : BaseRepository, IRequestRepository
    {
        public RequestRepository(IOptions<DbSettings> dbSettings) : base(dbSettings)
        {
        }

        private object GetRequestParmas(Request request)
        {
            return new
            {
                request.Id,
                request.RegistrationNo,
                request.ManufacturingDate,
                request.RegistrationDate,
                request.RTO,
                request.PolicyExpiryDate,
                request.Comments,
                request.PrefferedIDV,
                request.ClaimTaken,
                request.PolicyType,
                request.FuelType,
                request.AddOn,
                request.Make,
                request.Discount,
                request.PrefferedInsurer,
                request.PreviousInsurer,
                request.Variant,
                request.VehicleType,
                request.CaseType,
                request.RequestType,
                request.Status,
                request.CreatedBy
            };
        }
        public async Task<Request> CreateRequest(Request request)
        {
            return await this.SaveRequest(request, "CreateRequest", this.GetRequestParmas(request));
        }

        public async Task<Request> UpdateRequest(Request request)
        {
            return await this.SaveRequest(request, "UpdateRequest", this.GetRequestParmas(request));
        }

        public async Task<Request> SubmitRequest(Request request)
        {
            return await this.SaveRequest(request, "SubmitRequest", this.GetRequestParmas(request));
        }

        public async Task<Request> SaveRequest(Request request, string spName, object param = null)
        {
            Request req = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync(spName, param, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<Request>();
                    req = requestEntities.FirstOrDefault();
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

            return req;
        }


        public async Task<Boolean> ChangeRequestStatus(int RequestId, int Status, int UserId)
        {
            var changeSucess = false;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();


                    var result = await dbConnection.QueryMultipleAsync("ChangeRequestStatus",
                           new
                           {
                               RequestId = RequestId,
                               Status = Status,
                               UserId = UserId
                           },
                           commandType: CommandType.StoredProcedure);

                    changeSucess = true;
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

            return changeSucess;
        }




        public async Task<Request> GetRequestById(int requestId)
        {
            Request req = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetRequestById", new
                    {
                        id = requestId
                    }, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<Request>();
                    var docEntities = await result.ReadAsync<RequestDocument>();
                    var commentEntities = await result.ReadAsync<RequestComments>();
                    req = requestEntities.FirstOrDefault();
                    req.Documents = docEntities.ToList();
                    req.CommentsList = commentEntities.ToList();
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

            return req;
        }


       public async Task<List<Request>> GetRequestByStatus(int Status)
        {
            List<Request> reqs = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetRequestsByStatus", new
                    {
                        Status = Status
                    }, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<Request>();
                    reqs = requestEntities.ToList();
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

            return reqs;
        }
      
        public async Task<List<Request>> GetRequestsByCreatedUser(int userId)
        {
            List<Request> reqs = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetRequestsByCreatedUser", new
                    {
                        id = userId
                    }, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<Request>();
                    reqs = requestEntities.ToList();
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

            return reqs;
        }


        public async Task<RequestMasterData> GetRequestMasterData()
        {
            RequestMasterData data = new RequestMasterData();
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetRequestMasterData",
                                                       commandType: CommandType.StoredProcedure);

                    data.VehicleTypes = (await result.ReadAsync<VehicleType>()).ToList();   
                    data.AddOns = (await result.ReadAsync<AddOn>()).ToList();
                    data.CaseTypes = (await result.ReadAsync<CaseType>()).ToList();
                    data.FuelTypes = (await result.ReadAsync<FuelType>()).ToList();
                    data.Makes = (await result.ReadAsync<Make>()).ToList();
                    data.NCBDiscounts = (await result.ReadAsync<NCBDiscount>()).ToList();
                    data.PolicyTypes = (await result.ReadAsync<PolicyTypes>()).ToList();
                    data.PrefferedInsurers = (await result.ReadAsync<PrefferedInsurers>()).ToList();
                    data.PreviousInsurers = (await result.ReadAsync<PreviousInsurers>()).ToList();
                    data.RTO = (await result.ReadAsync<RTO>()).ToList();
                    data.Variants = (await result.ReadAsync<Variants>()).ToList();
                    data.RequestTypes = (await result.ReadAsync<RequestType>()).ToList();
                    data.RequestStatus = (await result.ReadAsync<RequestStatus>()).ToList();


                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }

                return data;
            }
        }

        public async Task<List<RequestComments>> AddComments(RequestComments comments)
        {
            List<RequestComments> req = new List<RequestComments> { };

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("AddComments", new
                    {
                        RequestId = comments.RequestId,
                        Comments = comments.Comments,
                        CreatedBy = comments.CreatedBy
                    }, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<RequestComments>();
                    req = requestEntities.ToList();
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

            return req;
        }

        public async Task<List<RequestComments>> UpdateComments(RequestComments comments)
        {
            List<RequestComments> req = new List<RequestComments> { };

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("UpdateComments", new
                    {
                        Id = comments.Id,
                        RequestId = comments.RequestId,
                        Comments = comments.Comments,
                        CreatedBy = comments.CreatedBy
                    }, commandType: CommandType.StoredProcedure); ;
                    var requestEntities = await result.ReadAsync<RequestComments>();
                    req = requestEntities.ToList();
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

            return req;
        }
        public async Task<RequestMapping> MapRequest(RequestMapping mapping)
        {
            RequestMapping req = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("MapPolicy", new
                    {
                        id = mapping.Id,
                        RequestId = mapping.RequestId,
                        PolicyId = mapping.PolicyId,
                        GrossValue = mapping.GrossValue,
                        NetValue = mapping.NetValue
                    }, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<RequestMapping>();
                    req = requestEntities.FirstOrDefault();
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
            return req;
        }

        public async Task<bool> UpdateMapPolicy(RequestMapping mapping)
        {
            bool success;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("UpdateMapPolicy", new
                    {
                        id = mapping.Id,
                        RequestId = mapping.RequestId,
                        PolicyId = mapping.PolicyId,
                        GrossValue = mapping.GrossValue,
                        NetValue = mapping.NetValue
                    }, commandType: CommandType.StoredProcedure);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    success = true;
                    dbConnection.Close();
                }
            }
            return success;
        }

        public async Task<RequestMapping> GetMapPolicyById(int requestMapId)
        {
            RequestMapping req = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetMapPolicyById", new
                    {
                        id = requestMapId
                    }, commandType: CommandType.StoredProcedure);
                    var requestEntities = await result.ReadAsync<RequestMapping>();
                    req = requestEntities.FirstOrDefault();
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

            return req;
        }
    }
}
