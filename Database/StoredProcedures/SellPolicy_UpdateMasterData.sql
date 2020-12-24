CREATE PROCEDURE [dbo].[SellPolicy_UpdateMasterData]
@MasterDataType varchar(100),
@Id int,
@NewValue varchar(100)
AS
BEGIN
	
	if @MasterDataType = 'segment' 
	begin
		update SellPolicy_Segment set name = @NewValue where id = @Id
	end
	if @MasterDataType = 'businesstype' 
	begin
		update SellPolicy_BusinessType set name = @NewValue where id = @Id
	end
	if @MasterDataType = 'policytype' 
	begin
		update SellPolicy_PolicyType  set name = @NewValue where id = @Id
	end
	if @MasterDataType = 'rto' 
	begin
		update SellPolicy_RTO set name = @NewValue where id = @Id
	end
END

