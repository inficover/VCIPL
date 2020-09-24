CREATE PROCEDURE [dbo].[GetPoliciesByCreatedUserId]
	@UserId int
AS
BEGIN

	create table #emp (
	id int,
	createdBy int,
	userName varchar(100),
	level int
	)
	
	insert into #emp exec GetUserHierarchyById @UserId



	select p.PolicyNumber, p.id, p.RegistrationNo, p.GrossPremium, p.NetPremium, p.ODPremium, ps.name as status,p.CPS, p.RSD, p.RED, p.IssueMode,
	p.InsuredName, m.Name as Make, b.Name as Broker, v.Name as VehicleType,i.name as Insurer, u.name as CreatedBy  from dbo.[policy] p 
	left join Makes m on p.Make = m.id
	left join Brokers b on p.Broker = b.Id
	left join VehiclesType v on p.VehicleType = v.id
	left join Insurers i on p.Insurer = i.id
	left join PolicyStatus ps on p.Status = ps.id
	left join Users u on u.id = p.CreatedBy

	where p.CreatedBy in (select id from #emp)
END
