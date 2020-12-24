CREATE PROCEDURE [dbo].[SellPolicy_DeleteMasterData]
@MasterDataType varchar(100),
@Id int
AS
BEGIN
	
	if @MasterDataType = 'segment' 
	begin
		delete SellPolicy_Segment where id = @MasterDataType
	end
	if @MasterDataType = 'businesstype' 
	begin
		delete SellPolicy_BusinessType where id = @MasterDataType
	end
	if @MasterDataType = 'policytype' 
	begin
		delete SellPolicy_PolicyType where id = @MasterDataType
	end
	if @MasterDataType = 'rto' 
	begin
		delete SellPolicy_RTO where id = @MasterDataType
	end
END

