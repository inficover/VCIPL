using Common.Helper;
using Contract;
using Contract.Repository;
using Microsoft.Extensions.Options;
using Model;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Manager
{
    public class UserManager : IUserManager
    {
        IUserRepository userRepository = null;
        IDocumentRepository documentRepository = null;

        private readonly MailSettings _mailSettings;
        private readonly AuthSettings _authSettings;

        public UserManager(IUserRepository userRepository, IDocumentRepository documentRepository, IOptions<MailSettings> mailSettings,
            IOptions<AuthSettings> authSettings)
        {
            this.userRepository = userRepository;
            this.documentRepository = documentRepository;
            this._mailSettings = mailSettings.Value;
            _authSettings = authSettings.Value;

        }
        public async Task<User> CreateUser(User user)
        {
            var password = CreateRandomPassword(user);
            EmailSender emailSender = new EmailSender(this._mailSettings.sendGridApiKey);
            var mailTemplate = new MailTemplate();
            mailTemplate.From = new Email() { MailId = "admin@vcipl.com", Name = "ADMIN - VCIPL" };
            mailTemplate.To = new Email() { MailId = user.MailId, Name = user.UserName };
            mailTemplate.Subject = "Password for your account";
            //mailTemplate.TextContent = "Here is the password for your newly created account \\r\\n Password: " +
            //   password + "Please change it on first login";
            mailTemplate.HtmlContent = "<div style=\"padding: 5px; background-color: #172b4d ;color: white;text-align: center;font-size: 25pxfont-weight: bold;\">VCIPL</div>"
                    + "<div style=\"padding: 5px; border: 2px solid #172b4d\"> " + 
                    "<p> Your account with VCIPL is created successfully. below are your username and default password </p> " + 
                    "<div style = \"text-align: center;font-weight: bold;font-size: 30px;\">"
                    + user.UserName + "</div>"+
                    "<div style = \"text-align: center;font-weight: bold;font-size: 30px;\">"
                    + password + "</div></div>";

            var mailResponse = await emailSender.SendEmailAsync(mailTemplate);
            user.Password = password;
            user.IsPasswordChangeRequired = true;
            var result = await userRepository.CreateUser(user);
            return result;
        }

        public async Task<TokenEntity> GetUser(string username, string password)
        {
            var userEntity = await userRepository.GetUser(username, password);

            if (userEntity != null)
            {
                TokenGenerator tokenGenerator = new TokenGenerator();
                return tokenGenerator.GenerateToken(userEntity, _authSettings.secret);
            }
            else
            {
                return null;
            }
        }

        private string CreateRandomPassword(User user)
        {
            char[] baseData = (user.MailId + user.UserName + user.Mobile).ToCharArray();
            var password = new char[10];
            Random r = new Random();
            for (int i = 0; i < 10; i++)
            {
                password[i] = baseData[r.Next(0, (baseData.Length - 1))];
            }

            return new string(password);
        }

        public async Task<User> UpdateUser(User user)
        {
            var userEntity = await userRepository.UpdateUser(user);
            return userEntity;
        }

        public async Task<List<UserWithReportees>> GetAllUsersCreatedBy(int userID)
        {
            var userEntitys = await userRepository.GetAllUsersCreatedBy(userID);
            return userEntitys;
        }

        public async Task<List<User>> GetUsersByIds(List<int> userIDs)
        {
            var userEntitys = await userRepository.GetUsersByIds(userIDs);
            return userEntitys;
        }

        public async  Task<List<User>> GetAllKycPendingUsers()
        {
            var userEntitys = await userRepository.GetAllKycPendingUsers();
            return userEntitys;
        }

        public async Task<List<DropDownOption>> GetAllOtherManagers(int userID)
        {
            var data = await userRepository.GetAllOtherManagers(userID);
            return data;
        }
        public async Task<MasterData> GetMasterData()
        {
            var roles = await userRepository.GetMasterData();
            return roles;
        }

        public async Task<Boolean> ChangePassword(ChangePasswordModel model)
        {
            var changed = await userRepository.ChangePassword(model);
            return changed;
        }


        public async Task<List<Document>> fetchKYCDocuments(int userID, string documentName)
        {
            var result = await documentRepository.GetDocumentsByUserId(userID, documentName);
            return result ;
        }

        public async Task<bool> uploadDocument(Document document)
        {
            var result = await documentRepository.AddDocuments(document);
            return result;
        }

        public async Task<bool> ChangeUserActivation(int UserId, bool IsActive)
        {
            var changed = await userRepository.ChangeUserActivation(UserId, IsActive);
            return changed;
        }

        public async Task<bool> ChangeUserStatus(int UserId, int Status)
        {
            var changed = await userRepository.ChangeUserStatus(UserId, Status);
            return changed;
        }

        public async Task<Boolean> ChangeUserManager(int UserId, int ManagerId)
        {
            var changed = await userRepository.ChangeUserManager(UserId, ManagerId);
            return changed;
        }

        public async Task<UserWithHierarchy> GetUserDetailsById(int userId)
        {
            var changed = await userRepository.GetUserDetailsById(userId);
            return changed;
        }

        public async Task<List<UserParentHierarchy>> GetUserParentHierarchyById(int userId)
        {
            var details = await userRepository.GetUserParentHierarchyById(userId);
            return details;
        }

        public async Task<BooleanResponseWIthMessage> RecordUserPayoutEntry(UserPayoutEntry entry)
        {
            var details = await userRepository.RecordUserPayoutEntry(entry);
            return details;
        }

        public async Task<PayoutAggregations> GetUserPayoutAggregations(string userId)
        {
            var details = await userRepository.GetUserPayoutAggregations(userId);
            return details;
        }

        public async Task<List<DashBoardAggregation>> GetPolicyAggregationsByUserReporties(UserDashBoardQuery query)
        {
            var details = await userRepository.GetPolicyAggregationsByUserReporties(query);
            return details;
        }
    }
}
