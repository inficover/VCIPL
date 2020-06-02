CREATE PROCEDURE [dbo].[GetPoliciesByCreatedUserId]
	@UserId int
AS
BEGIN

	select p.id, p.RegistrationNo, p.GrossPremium, p.NetPremium, p.ODPremium, m.Name as Make, b.Name as Broker, v.Name as VehicleType,i.name as Insurer  from dbo.[policy] p 
	inner join Makes m on p.Make = m.id
	inner join Brokers b on p.Broker = b.Id
	inner join VehiclesType v on p.VehicleType = v.id
	inner join Insurers i on p.Insurer = i.id

	where p.CreatedBy = @UserId
END
