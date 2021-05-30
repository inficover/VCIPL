using Contract;
using Contract.Manager;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Manager
{
    public class ManagerBootStrapper
    {
        public static void Init(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserManager, UserManager>();
            services.AddScoped<IRequestManager, RequestManager>();
            services.AddScoped<IFileManager, FileManager>();
            services.AddScoped<IPolicyManager, PolicyManager>();
            services.AddScoped<ISellPolicyManager, SellPolicyManager>();
            services.AddScoped<IPolicyRenewalNotificationsManager, PolicyRenewalNotificationsManager>();
            services.AddScoped<IMasterDataManager, MasterDataManager>();
            services.AddScoped<IQuoteManager, QuoteManager>();

        }
    }
}
