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

namespace Repository
{
    public class BaseRepository
    {
        private readonly DbSettings _dbSettings;

        public BaseRepository(IOptions<DbSettings> dbSettings)
        {
            _dbSettings = dbSettings.Value;
        }

        public IDbConnection GetConnection()
        {
            return new SqlConnection(_dbSettings.connection);
        }
    }
}
