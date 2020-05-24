using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Entities
{
   public class UserEntity
    {
        public int Id { get; set; }
        public string UserName { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }

        public string MailId { get; set; }

        public string Mobile { get; set; }

        public int CreatedBy { get; set; }

        public bool IsPasswordChangeRequired { get; set; }

        public bool IsActive { get; set; }

        public int Status { get; set; }
        public decimal Payout { get; set; }



    }

    public class RoleEntity
    {
        public int Id { get; set; }

        public string RoleName { get; set; }
    }
}
