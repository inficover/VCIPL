using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models
{
    public class TokenEntity
    {
        public long TokenId { get; set; }
        public long UserId { get; set; }
        public string Token { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidUntil { get; set; }
    }
}
