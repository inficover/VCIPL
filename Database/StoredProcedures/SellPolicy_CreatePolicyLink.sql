CREATE PROCEDURE [dbo].[CreatePolicyLink]
	@SegmentId int,
	@PolicyTypeId int,
	@BusinessTypeId int,
	@RTO_Id int,
	@URL varchar(200)
AS
BEGIN
	IF NOT EXISTS (select COUNT(*) from SellPolicy_URL
	where SegmentId = @SegmentId and PolicyTypeId = @PolicyTypeId and BusinessTypeId = @BusinessTypeId
	and RTO_Id = @RTO_Id)
	Begin
		insert into SellPolicy_URL(SegmentId, PolicyTypeId, BusinessTypeId, RTO_Id, URL) values (@SegmentId, @PolicyTypeId, @BusinessTypeId, @RTO_Id, @URL)
	End
	Else 
	Begin
		THROW 51000, 'Url already exists for this combination' , 0;
		RETURN
	end
END
