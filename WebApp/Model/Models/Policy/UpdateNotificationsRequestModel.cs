using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models.Policy
{
    public class UpdateNotificationsRequestModel
    {
        public int Status { get; set; }
        public int[] Ids { get; set; }
    }

}
