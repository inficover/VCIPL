using Model;
using Model.Entities;
using Model.Models;
using Model.Models.Policy;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract.Repository
{
    public interface IPolicyRenewalNotificationsRepository
    {

        Task<bool> RefreshNotifications(int? userId);
        Task<bool> UpdateNotificationStatus(int[] ids, int status);

        Task<List<PolicyRenewalsDetails>> GetPolicyRenewalNotificationByCriteria(int userId);

    }
}
