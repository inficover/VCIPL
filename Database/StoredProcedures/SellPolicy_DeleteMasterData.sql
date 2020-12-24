CREATE PROCEDURE [dbo].[SellPolicy_DeleteMasterData]
@MasterDataType varchar(100),
@Id int
AS
BEGIN
	
	if @MasterDataType = 'segment' 
	begin
		delete SellPolicy_Segment where  id = @Id
	end
	if @MasterDataType = 'businesstype' 
	begin
		delete SellPolicy_BusinessType where  id = @Id
	end
	if @MasterDataType = 'policytype' 
	begin
		delete SellPolicy_PolicyType where  id = @Id
	end
	if @MasterDataType = 'rto' 
	begin
		delete SellPolicy_RTO where  id = @Id
	end
END

