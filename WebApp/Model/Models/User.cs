using Model.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }

        public string Password { get; set; }

        public string MailId { get; set; }

        public string Mobile { get; set; }

        public List<int> Roles { get; set; }

        public int CreatedBy { get; set; }

        public bool IsPasswordChangeRequired { get; set; }

        public bool IsActive { get; set; }

        public int Status { get; set; }
        public decimal? Payout { get; set; }

        public List<Document> Documents { get; set; }

        public List<BankAccounts> BankAccounts { get; set; }

    }

    public class UserWithHierarchy : User
    {
        public User parent;
    }

    public class UserWithError : User
    {
        public  string ErrorMessage;
    }
    public class UserWithReportees : User
    {
        public int ActiveReportees { get; set; }

        public int TotalReportees { get; set; }
        public int TotalUsers { get; set; }

        public int ActiveUsers { get; set; }

    }
}
