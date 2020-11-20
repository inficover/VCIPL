CREATE PROCEDURE [dbo].[FixPayout]
	@PolicyId int,
	@CalOn varchar(100),
	@PayInPercentage decimal,
	@PayOutTo int,
	@PayOutPercentage decimal,
	@PayoutAmount decimal,
	@PayoutComment varchar(100)
AS
Begin

Declare @Generatedid int;
IF NOT EXISTS (SELECT * FROM Policy where id = @PolicyId)
BEGIN
	insert into  dbo.[Policy_Payout] (
		PolicyId,
		CalOn,
		PayInPercentage,
		PayOutTo,
		PayOutPercentage,
		PayoutAmount,
		PayoutComment,
		Date
	
	) values (
		@PolicyId ,
		@CalOn,
		@PayInPercentage,
		@PayOutTo,
		@PayOutPercentage,
		@PayoutAmount,
		@PayoutComment,
		GETDATE()
	)
END
ELSE
BEGIN
	update Policy_Payout 
		set 
		CalOn = @CalOn,
		PayInPercentage = @PayInPercentage,
		PayOutTo =  @PayOutTo,
		PayOutPercentage = @PayOutPercentage,
		PayoutAmount = @PayoutAmount,
		PayoutComment = @PayoutComment,
		Date = GETDATE()
	where PolicyId =  @PolicyId
END
end

