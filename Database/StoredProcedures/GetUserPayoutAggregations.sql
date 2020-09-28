CREATE PROCEDURE [dbo].[GetUserPayoutAggregations]
    @UserId INT
AS

declare @totalPaid decimal;
declare @fixedPayout decimal;

select sum(Amount) as Total, userid as Id from UserPayoutEntry where UserId = @UserId group by userid

select sum(PayoutAmount) as Total, PayOutTo as Id from Policy_Payout where PayOutTo = 2 group by PayOutTo