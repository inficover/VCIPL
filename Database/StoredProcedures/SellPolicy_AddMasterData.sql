CREATE PROCEDURE [dbo].[SellPolicy_AddMasterData]
@MasterDataType varchar(100),
@ParentId int,
@values StringsList readonly
AS
BEGIN
	
	if @MasterDataType = 'segment' 
	begin
		insert into SellPolicy_Segment(Name) select Id from @values
	end
	if @MasterDataType = 'businesstype' 
	begin
		insert into SellPolicy_BusinessType(Name, PolicyTypeId) select Id, @ParentId from @values
	end
	if @MasterDataType = 'policytype' 
	begin
		insert into SellPolicy_PolicyType(Name, SegmentId) select Id, @ParentId from @values
	end
	if @MasterDataType = 'rto' 
	begin
		insert into SellPolicy_RTO(Name, BusinessTypeId) select Id, @ParentId from @values
	end
END

