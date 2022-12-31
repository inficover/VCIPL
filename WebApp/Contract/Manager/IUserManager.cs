using Model;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract
{
   public interface IUserManager
    {

        Task<User> CreateUser(User user);

        Task<TokenEntity> GetUser(string username, string password);

        Task<User> UpdateUser(User user);
        Task<List<UserWithReportees>> GetAllUsersCreatedBy(int userID);
        Task<List<User>> GetUsersByIds(List<int> userIDs);
        Task<List<User>> GetAllUsersBtSearchTerm(string SearchTerm);
        Task<List<User>> GetAllKycPendingUsers();
        Task<MasterData> GetMasterData();

        Task<List<DropDownOption>> GetAllOtherManagers(int userID);

        Task<Boolean> ChangePassword(ChangePasswordModel model);

        Task<List<Document>> fetchKYCDocuments(int userID, string documentName);

        Task<bool> uploadDocument(Document document);

        Task<Boolean> ChangeUserActivation(int UserId, bool IsActive);
        Task<Boolean> ChangeUserStatus(int UserId, int Status);
        Task<Boolean> ChangeUserManager(int UserId, int ManagerId);

        Task<UserWithHierarchy> GetUserDetailsById(int userId);

        Task<List<UserParentHierarchy>> GetUserParentHierarchyById(int userID);
        Task<BooleanResponseWIthMessage> RecordUserPayoutEntry(UserPayoutEntry entry);
        Task<PayoutAggregations> GetUserPayoutAggregations(string userId);
        Task<List<DashBoardAggregation>> GetPolicyAggregationsByUserReporties(UserDashBoardQuery query);

        Task<BooleanResponseWIthMessage> UpdateUserBasicDetails(UpdateUserModel user);

    }
}
