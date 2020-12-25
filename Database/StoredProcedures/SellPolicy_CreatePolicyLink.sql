CREATE PROCEDURE [dbo].[CreatePolicyLink]
	@SegmentId int,
	@PolicyTypeId int,
	@BusinessTypeId int,
	@RTO_Id int,
	@URL varchar(200)
AS
BEGIN
	
	insert into SellPolicy_URL(SegmentId, PolicyTypeId, BusinessTypeId, RTO_Id, URL) values (@SegmentId, @PolicyTypeId, @BusinessTypeId, @RTO_Id, @URL)

END
