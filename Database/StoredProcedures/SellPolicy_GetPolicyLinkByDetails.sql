CREATE PROCEDURE [dbo].[GetPolicyLinkByDetails]
	@SegmentId int,
	@PolicyTypeId int,
	@BusinessTypeId int,
	@RTO_Id int
AS
BEGIN
	
	select 
	ss.Name as Segment, ss.id as SegmentId,	
	sb.Name as BusinessType, sb.id as BusinessTypeId,
	sp.Name as PolicyType, sp.id as PolicyTypeId,
	sr.Name as RTO, sr.id as RTO_Id, su.URL
	from SellPolicy_URL su
	left join SellPolicy_BusinessType sb on sb.id = su.BusinessTypeId
	left join SellPolicy_Segment ss on ss.id = su.SegmentId
	left join SellPolicy_PolicyType sp on sp.id = su.PolicyTypeId
	left join SellPolicy_RTO sr on sr.id = su.RTO_Id
	where 1 = 1
	AND (@SegmentId is null or SegmentId = @SegmentId )
	AND (@PolicyTypeId is null or PolicyTypeId = @PolicyTypeId )
	AND (@BusinessTypeId is null or BusinessTypeId = @BusinessTypeId )
	AND (@RTO_Id is null or RTO_Id = @RTO_Id )


END