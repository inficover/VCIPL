CREATE PROCEDURE [dbo].[CreatePolicyLink]
	@SegmentId int,
	@PolicyTypeId int,
	@BusinessTypeId int,
	@RTO_Id int,
	@URL varchar(200)
AS
BEGIN
	IF EXISTS (select * from SellPolicy_URL
	where SegmentId = @SegmentId and PolicyTypeId = @PolicyTypeId and BusinessTypeId = @BusinessTypeId
	and RTO_Id = @RTO_Id)
	Begin
		THROW 51000, 'Url already exists for this combination' , 0;
		RETURN
	End
	
	insert into SellPolicy_URL(SegmentId, PolicyTypeId, BusinessTypeId, RTO_Id, URL) values (@SegmentId, @PolicyTypeId, @BusinessTypeId, @RTO_Id, @URL)

END
