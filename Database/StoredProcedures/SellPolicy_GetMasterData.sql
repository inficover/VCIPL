CREATE PROCEDURE [dbo].[SellPolicy_GetMasterData]
AS
BEGIN
	select * from SellPolicy_Segment
	select * from SellPolicy_BusinessType
	select * from SellPolicy_PolicyType
	select * from SellPolicy_RTO
END
