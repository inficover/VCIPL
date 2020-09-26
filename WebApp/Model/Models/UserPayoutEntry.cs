using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Models
{
    public enum TransactionType
    {
        BankTransfer,
        GPay,
        PhonePay,
        Check,
        Cash
    }
    public class UserPayoutEntry
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public string TransactionId { get; set; }
        public string TransactionComments { get; set; }
        public DateTime TransactionDate { get; set; }
        public TransactionType TransactionType { get; set; }
    }
}
