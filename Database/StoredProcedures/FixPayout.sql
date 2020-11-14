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
end

