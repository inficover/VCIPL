CREATE PROCEDURE [dbo].[GetPoliciesByCreatedUserId]
	@UserId int
AS
BEGIN

	select p.PolicyNumber, p.id, p.RegistrationNo, p.GrossPremium, p.NetPremium, p.ODPremium, ps.name as status,
	p.InsuredName, m.Name as Make, b.Name as Broker, v.Name as VehicleType,i.name as Insurer  from dbo.[policy] p 
	left join Makes m on p.Make = m.id
	left join Brokers b on p.Broker = b.Id
	left join VehiclesType v on p.VehicleType = v.id
	left join Insurers i on p.Insurer = i.id
	left join PolicyStatus ps on p.Status = ps.id

	where p.CreatedBy = @UserId
END
