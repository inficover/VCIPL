using Common.Helper;
using Contract;
using Contract.Repository;
using Microsoft.Extensions.Options;
using Model;
using Model.Models;
using Model.Models.Policy;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Manager
{
    public class PolicyRenewalNotificationsManager : IPolicyRenewalNotificationsManager
    {
        IPolicyRenewalNotificationsRepository repo = null;

        public PolicyRenewalNotificationsManager(IPolicyRenewalNotificationsRepository repository)
        {
            this.repo = repository;
        }
        public async Task<bool> RefreshNotifications(int? userId)
        {
            return await repo.RefreshNotifications(userId);
        }

        public async Task<bool> UpdateNotificationStatus(int[] ids, int status)
        {
            return await repo.UpdateNotificationStatus(ids, status);
        }

        public async Task<List<PolicyRenewalsDetails>> GetPolicyRenewalNotificationByCriteria(int userId)
        {
            return await repo.GetPolicyRenewalNotificationByCriteria(userId);
        }

    }
}
