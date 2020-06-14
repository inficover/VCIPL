CREATE PROCEDURE [dbo].[GetPoliciesByCriteria]
	@StatusList IntegersList readonly,
	@CreatedByList IntegersList readonly,
	@VehicleTypesList IntegersList readonly
AS
BEGIN
	declare @statusCount int
	declare @vehicleTypesCount int
	declare @cretaedByCount int

	select @statusCount = count(*) from @StatusList
	select @cretaedByCount = count(*) from @CreatedByList
	select @vehicleTypesCount = count(*) from @VehicleTypesList


	select  p.PolicyNumber, p.id, p.RegistrationNo, p.GrossPremium, p.NetPremium, p.ODPremium, ps.name as status,
	p.InsuredName, m.Name as Make, b.Name as Broker, v.Name as VehicleType,i.name as Insurer  from dbo.[policy] p 
	left join Makes m on p.Make = m.id
	left join Brokers b on p.Broker = b.Id
	left join VehiclesType v on p.VehicleType = v.id
	left join Insurers i on p.Insurer = i.id
	left join PolicyStatus ps on p.Status = ps.id

	where 1 = 1
	AND (@statusCount = 0 or p.Status in (select id from @StatusList))
	AND (@cretaedByCount = 0 or p.CreatedBy in (select id from @CreatedByList))
	AND (@vehicleTypesCount = 0 or p.VehicleType in (select id from @VehicleTypesList))
END



--DECLARE @statuslist IntegersList;
--DECLARE @userlist IntegersList;
  
----INSERT INTO @statuslist VALUES (1);
----INSERT INTO @userlist VALUES (4),(1);

--exec GetPoliciesByCriteria @statuslist, @userlist