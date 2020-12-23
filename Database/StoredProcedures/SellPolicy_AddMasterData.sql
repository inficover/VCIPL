CREATE PROCEDURE [dbo].[SellPolicy_AddMasterData]
@MasterDataType varchar(100),
@values StringsList readonly
AS
BEGIN
	
	if @MasterDataType = 'segment' 
	begin
		insert into SellPolicy_Segment values (@values)
	end
	if @MasterDataType = 'businesstype' 
	begin
		insert into SellPolicy_BusinessType values (@values)
	end
	if @MasterDataType = 'policytype' 
	begin
		insert into SellPolicy_PolicyType values (@values)
	end
	if @MasterDataType = 'rto' 
	begin
		insert into SellPolicy_RTO values (@values)
	end
END

