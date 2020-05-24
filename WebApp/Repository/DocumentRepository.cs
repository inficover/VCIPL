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
    public class DocumentRepository : IDocumentRepository
    {
        private readonly DbSettings _dbSettings;

        public DocumentRepository(IOptions<DbSettings> dbSettings)
        {
            _dbSettings = dbSettings.Value;
        }

        public async Task<bool> AddDocuments(Document document)
        {
            var uploadSucess = false;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryAsync("AddUserDocument",
                            new
                            {
                                UserId = document.UserId,
                                DocumentName = document.Name,
                                DocumentType = document.Type,
                                DocumentData = document.Data,
                                FileType = document.FileType
                            },
                            commandType: CommandType.StoredProcedure);

                    uploadSucess = true;
                    //var docsEnt = await result.ReadAsync<Document>();

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

            return uploadSucess;
        }

        public async Task<List<Document>> GetDocumentsByUserId(int userID, string documentName)
        {
            List<Document> documents = new List<Document>();


            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetUserDocuments",
                            new
                            {
                                UserId = userID,
                                DocumentName = documentName
                            },
                            commandType: CommandType.StoredProcedure);

                    var docsEnt = await result.ReadAsync<Document>();

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

        private IDbConnection GetConnection()
        {
            return new SqlConnection(_dbSettings.connection);
        }
    }
}
