using Contract;
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
        }
    }
}
