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
    public class UserRepository : BaseRepository, IUserRepository
    {

        public UserRepository(IOptions<DbSettings> dbSettings) : base(dbSettings)
        {
        }

        public async Task<List<DropDownOption>> GetAllOtherManagers(int userID)
        {

            List<DropDownOption> dropDownOptions = new List<DropDownOption>();


            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetAllOtherManagers",
                        new { userId = userID },
                            commandType: CommandType.StoredProcedure);

                    var dropDownOptionEnt = await result.ReadAsync<DropDownOption>();

                    dropDownOptions = dropDownOptionEnt.ToList();

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

            return dropDownOptions;
        }
        public async Task<MasterData> GetMasterData()
        {
            MasterData data = new MasterData();

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();
                    var result = await dbConnection.QueryMultipleAsync("GetMasterData",
                                                       commandType: CommandType.StoredProcedure);

                    data.Roles = (await result.ReadAsync<Role>()).ToList();
                    data.UserStatuses = (await result.ReadAsync<UserStatus>()).ToList();


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

        public async Task<List<User>> GetAllKycPendingUsers()
        {
            List<User> users = new List<User>();


            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetAllKycPendingUsers",
                            commandType: CommandType.StoredProcedure);

                    var userEnt = await result.ReadAsync<User>();

                    users = userEnt.ToList();

                    users.ToList().ForEach(user =>
                    {
                        user.Password = null;
                    });
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

            return users;

        }

        public async Task<List<UserWithReportees>> GetAllUsersCreatedBy(int userID)
        {
            List<UserWithReportees> users = new List<UserWithReportees>();
            List<UserRole> roles = new List<UserRole>();


            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetUsersByCreataedBy",
                            new
                            {
                                UserId = userID
                            },
                            commandType: CommandType.StoredProcedure);

                    var userEnt = await result.ReadAsync<UserWithReportees>();
                    var rolesEnt = await result.ReadAsync<UserRole>();

                    users = userEnt.ToList();
                    roles = rolesEnt.ToList();

                    users.ToList().ForEach(user =>
                    {
                        user.Password = null;
                        user.Roles = roles.Where(r => r.UserId == user.Id)
                        .Select(r => r.RoleId).ToList();
                    });
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

            return users;

        }

        public async Task<List<User>> GetUsersByIds(List<int> userIDs)
        {
            List<User> users = new List<User>();

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetUsersByIds",
                            new
                            {
                                UserIDs =   Converter.CreateDataTable(userIDs.AsEnumerable())
                            },
                            commandType: CommandType.StoredProcedure);

                    var userEnt = await result.ReadAsync<User>();


                    users = userEnt.ToList();
                    users.ToList().ForEach(user =>
                    {
                        user.Password = null;
                    });
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

            return users;

        }
        public async Task<User> CreateUser(User user)
        {
            User userResult = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("CreateUser",
                            new
                            {
                                UserName = user.UserName,
                                Name = user.Name,
                                Password = user.Password,
                                MailId = user.MailId,
                                Mobile = user.Mobile,
                                CreatedBy = user.CreatedBy,
                                IsPasswordChangeRequired = user.IsPasswordChangeRequired,
                                IsActive = true,
                                Status = user.Status,
                                Payout = user.Payout,
                                roles = Converter.CreateDataTable(user.Roles.AsEnumerable())
                            },
                            commandType: CommandType.StoredProcedure);

                    var userEnt = await result.ReadAsync<User>();
                    var roleEnt = await result.ReadAsync<RoleEntity>();
                    if (userEnt.Count() > 0 && roleEnt.Count() > 0)
                    {
                        userResult = userEnt.FirstOrDefault();
                        userResult.Password = null;
                        userResult.Roles = roleEnt.AsEnumerable().Select(role => role.Id).ToList<int>();
                    }

                }
                catch (Exception ex)
                {
                    userResult = new UserWithError
                    {
                        ErrorMessage = ex.Message
                    };
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return userResult;
        }

        public async Task<UserWithHierarchy> GetUserDetailsById(int id)
        {
            UserWithHierarchy userEntity = null;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetUserById",
                            new
                            {
                                Id = id
                            },
                            commandType: CommandType.StoredProcedure);

                    var userEnt = await result.ReadAsync<UserWithHierarchy>();
                    var roleEnt = await result.ReadAsync<RoleEntity>();
                    var parentEnt = await result.ReadAsync<User>();
                    var docEnt = await result.ReadAsync<Document>();
                    var bankEnt = await result.ReadAsync<BankAccounts>();

                    if (userEnt.Count() > 0 && roleEnt.Count() > 0)
                    {
                        userEntity = userEnt.FirstOrDefault();
                        userEntity.Password = null;
                        userEntity.Roles = roleEnt.AsEnumerable().Select(role => role.Id).ToList<int>();
                        userEntity.parent = parentEnt.FirstOrDefault();
                        userEntity.Documents = docEnt.ToList();
                        userEntity.BankAccounts = bankEnt.ToList();
                    }

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
            return userEntity;

        }
        public async Task<UserWithHierarchy> GetUser(string username, string password)
        {
            UserWithHierarchy userEntity = null;
            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetUser",
                            new
                            {
                                UserName = username,
                                Password = password
                            },
                            commandType: CommandType.StoredProcedure);

                    var userEnt = await result.ReadAsync<UserWithHierarchy>();
                    var roleEnt = await result.ReadAsync<RoleEntity>();
                    var parentEnt = await result.ReadAsync<User>();
                    var docEnt = await result.ReadAsync<Document>();
                    var bankEnt = await result.ReadAsync<BankAccounts>();

                    if (userEnt.Count() > 0 && roleEnt.Count() > 0)
                    {
                        userEntity = userEnt.FirstOrDefault();
                        userEntity.Password = null;
                        userEntity.Roles = roleEnt.AsEnumerable().Select(role => role.Id).ToList<int>();
                        userEntity.parent = parentEnt.FirstOrDefault();
                        userEntity.Documents = docEnt.ToList();
                        userEntity.BankAccounts = bankEnt.ToList();
                    }

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
            return userEntity;

        }

        public async Task<User> UpdateUser(User user)
        {
            User userResult = null;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("UpdateUser",
                            new
                            {
                                Id = user.Id,
                                UserName = user.UserName,
                                Name = user.Name,
                                //Password = user.Password,
                                MailId = user.MailId,
                                Mobile = user.Mobile,
                                IsPasswordChangeRequired = user.IsPasswordChangeRequired,
                                IsActive = user.IsActive,
                                Status = user.Status,
                                Payout = user.Payout,
                                Roles = Converter.CreateDataTable(user.Roles.AsEnumerable()),
                                BankAccounts = Converter.ToDataTable<BankAccounts>(user.BankAccounts)

                            },
                            commandType: CommandType.StoredProcedure);

                    var userEnt = await result.ReadAsync<User>();
                    var roleEnt = await result.ReadAsync<RoleEntity>();
                    var docEnt = await result.ReadAsync<Document>();
                    var bankEnt = await result.ReadAsync<BankAccounts>();
                    if (userEnt.Count() > 0 && roleEnt.Count() > 0)
                    {
                        userResult = userEnt.FirstOrDefault();
                        userResult.Password = null;
                        userResult.Roles = roleEnt.AsEnumerable().Select(role => role.Id).ToList<int>();
                        userResult.BankAccounts = bankEnt.ToList();
                        userResult.Documents = docEnt.ToList();

                    }

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

            return userResult;
        }

        public async Task<Boolean> ChangePassword(ChangePasswordModel model)
        {
            var changeSucess = false;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();


                    var result = await dbConnection.QueryMultipleAsync("ChangePassword",
                           new
                           {
                               UserId = model.Id,
                               OldPassword = model.OldPassword,
                               Newpassword = model.NewPassword
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


        public async Task<Boolean> ChangeUserActivation(int UserId, bool IsActive)
        {
            var changeSucess = false;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();


                    var result = await dbConnection.QueryMultipleAsync("ChangeUserActivation",
                           new
                           {
                               UserId = UserId,
                               IsActive = IsActive
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

        public async Task<Boolean> ChangeUserStatus(int UserId, int Status)
        {
            var changeSucess = false;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();


                    var result = await dbConnection.QueryMultipleAsync("ChangeUserStatus",
                           new
                           {
                               UserId = UserId,
                               Status = Status
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

        public async Task<Boolean> ChangeUserManager(int UserId, int ManagerId)
        {
            var changeSucess = false;

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();


                    var result = await dbConnection.QueryMultipleAsync("ChangeUserManager",
                           new
                           {
                               UserId = UserId,
                               ManagerId = ManagerId
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

        public async Task<List<UserParentHierarchy>> GetUserParentHierarchyById(int userId)
        {
            List<UserParentHierarchy> users = new List<UserParentHierarchy>();

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("GetUserParentHierarchyById",
                            new
                            {
                                UserId = userId
                            },
                            commandType: CommandType.StoredProcedure);

                    var userEnt = await result.ReadAsync<UserParentHierarchy>();


                    users = userEnt.ToList();
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

            return users;

        }

        public async Task<BooleanResponseWIthMessage> RecordUserPayoutEntry(UserPayoutEntry entry)
        {
            BooleanResponseWIthMessage res = new BooleanResponseWIthMessage();

            using (IDbConnection dbConnection = this.GetConnection())
            {
                try
                {
                    dbConnection.Open();

                    var result = await dbConnection.QueryMultipleAsync("RecordUserPayoutEntry",
                            new
                            {
                                entry.Amount,
                                entry.Id,
                                entry.TransactionComments,
                                entry.TransactionDate,
                                entry.TransactionId,
                                entry.TransactionType,
                                entry.UserId
                            },
                            commandType: CommandType.StoredProcedure);

                    res.Response = true;
                }
                catch (Exception ex)
                {
                    res.Response = false;
                    res.Message = ex.Message;
                    throw ex;
                }
                finally
                {
                    dbConnection.Close();
                }
            }

            return res;
        }
        
    }
}
