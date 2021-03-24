using Model.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class UpdateUserModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }

        public string Password { get; set; }

        public string MailId { get; set; }

        public string Mobile { get; set; }

        public List<int> Roles { get; set; }

        public decimal? Payout { get; set; }
    }
}
