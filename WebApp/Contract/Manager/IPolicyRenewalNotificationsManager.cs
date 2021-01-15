using Model;
using Model.Models;
using Model.Models.Policy;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contract
{
   public interface IPolicyRenewalNotificationsManager
    {
        Task<bool> RefreshNotifications(int? userId); 
        Task<bool> UpdateNotificationStatus(int[] ids, int status);

        Task<List<PolicyRenewalsDetails>> GetPolicyRenewalNotificationByCriteria(int userId);

    }
}
