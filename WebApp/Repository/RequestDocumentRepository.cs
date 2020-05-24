using Common.Helper;
using Contract.Repository;
using Dapper;
using Microsoft.Extensions.Options;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RequestDocumentRepository : BaseRepository, IRequestDocumentRepository
    {

        public RequestDocumentRepository(IOptions<DbSettings> dbSettings) : base(dbSettings)
        {
        }

        public async Task<int> AddDocuments(RequestDocument document)
        {

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("AddRequestDocument",
                            new
                            {
                                RequestId = document.RequestId,
                                DocumentName = document.Name,
                                DocumentType = document.Type,
                                DocumentData = document.Data,
                                FileType = document.FileType
                            },
                            commandType: CommandType.StoredProcedure);

                    var docsEnt = result.ReadAsync<int>().Result.Single();

                    return docsEnt;

                    //documents = docsEnt.ToList();

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

        }

        public async Task<List<RequestDocument>> GetAllRequestDocuments(int requestId, string documentType)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteRequestDocument(int requestId, int documentId)
        {
            var deleteSuccess = false;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryAsync("DeleteRequestDocument",
                            new
                            {
                                RequestId = requestId,
                                DocumentId = documentId
                            },
                            commandType: CommandType.StoredProcedure);

                    deleteSuccess = true;
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

            return deleteSuccess;
        }

        public async Task<List<RequestDocument>> GetDocumentsByRequestId(int requestID, int documentId)
        {
            List<RequestDocument> documents = new List<RequestDocument>();


            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetRequestDocuments",
                            new
                            {
                                RequestId = requestID,
                                DocumentId = documentId
                            },
                            commandType: CommandType.StoredProcedure);

                    var docsEnt = await result.ReadAsync<RequestDocument>();

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

    }
}
