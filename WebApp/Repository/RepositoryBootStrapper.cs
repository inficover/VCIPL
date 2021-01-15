using Contract.Repository;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public class RepositoryBootStrapper
    {
        public static void Init(IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRequestRepository, RequestRepository>();
            services.AddScoped<IRequestDocumentRepository, RequestDocumentRepository>();
            services.AddScoped<IDocumentRepository, DocumentRepository>();
            services.AddScoped<IPolicyRepository, PolicyRepository>();
            services.AddScoped<ISellPolicyRepository, SellPolicyRepository>();
            services.AddScoped<IPolicyRenewalNotificationsRepository, PolicyRenewalNotificationsRepository>();

        }
    }
}
