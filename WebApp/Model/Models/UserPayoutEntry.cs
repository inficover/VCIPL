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
        Cheque,
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

    public class PayoutAggregations
    {
        public PayoutAggregations()
        {
            this.TotalPaid = 0;
            this.FixedPayout = 0;
        }
        public decimal TotalPaid { get; set; }
        public decimal FixedPayout { get; set; }
    }

    public class UserDashBoardQuery
    {
        public int UserId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
