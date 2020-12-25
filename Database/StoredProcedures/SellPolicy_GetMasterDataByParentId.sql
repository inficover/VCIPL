CREATE PROCEDURE [dbo].[SellPolicy_GetMasterDataByParentId]
@MasterDataType varchar(100),
@ParentId int
AS
BEGIN

	if @MasterDataType = 'segment' 
	begin
		select * from SellPolicy_Segment
	end
	if @MasterDataType = 'businesstype' 
	begin
		select * from SellPolicy_BusinessType where PolicyTypeId = @ParentId
	end
	if @MasterDataType = 'policytype' 
	begin
		select * from SellPolicy_PolicyType where SegmentId = @ParentId
	end
	if @MasterDataType = 'rto' 
	begin
		select * from SellPolicy_RTO where BusinessTypeId = @ParentId
	end
END
