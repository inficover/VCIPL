CREATE PROCEDURE [dbo].[GetPoliciesByCriteria]
	@UserId int,
	@StatusList IntegersList readonly,
	@CreatedByList IntegersList readonly,
	@VehicleTypesList IntegersList readonly,
	@PolicyTypesList IntegersList readonly,
	@FuelTypesList IntegersList readonly,
	@IssueModesList StringsList readonly,
	@VehicleNumber varchar(50),
	@PolicyNumber varchar(50),
	@InsuredName varchar(50),
	@InsuredMobile varchar(50),
	@RED_Start date,
	@RED_End date,
	@RSD_Start date,
	@RSD_End date
AS
BEGIN
	declare @statusCount int
	declare @vehicleTypesCount int
	declare @cretaedByCount int
	declare @policyTypesCount int
	declare @fuelTypesCount int
	declare @issueModesCount int

	select @statusCount = count(*) from @StatusList
	select @cretaedByCount = count(*) from @CreatedByList
	select @vehicleTypesCount = count(*) from @VehicleTypesList
	select @policyTypesCount = count(*) from @PolicyTypesList
	select @fuelTypesCount = count(*) from @FuelTypesList
	select @issueModesCount = count(*) from @IssueModesList

	create table #emp (
	id int,
	createdBy int,
	userName varchar(100),
	level int
	)
	
	insert into #emp exec GetUserHierarchyById @UserId

	select  p.PolicyNumber, p.id, p.RegistrationNo, p.GrossPremium, p.NetPremium, p.ODPremium, ps.name as status,p.CPS, p.RSD, p.RED, p.IssueMode,
	p.InsuredName, m.Name as Make, b.Name as Broker, v.Name as VehicleType,i.name as Insurer , u.name as CreatedBy  
	from dbo.[policy] p 
	left join Makes m on p.Make = m.id
	left join Brokers b on p.Broker = b.Id
	left join VehiclesType v on p.VehicleType = v.id
	left join Insurers i on p.Insurer = i.id
	left join PolicyStatus ps on p.Status = ps.id
	left join Users u on u.id = p.CreatedBy

	where 1 = 1
	-- AND (p.CreatedBy in (select id from #emp))
	AND (@statusCount = 0 or p.Status in (select id from @StatusList))
	AND (@cretaedByCount = 0 or p.CreatedBy in (select id from @CreatedByList))
	AND (@vehicleTypesCount = 0 or p.VehicleType in (select id from @VehicleTypesList))
	AND (@policyTypesCount = 0 or p.PolicyType in (select id from @PolicyTypesList))
	AND (@fuelTypesCount = 0 or p.FuelType in (select id from @FuelTypesList))
	AND (@issueModesCount = 0 or p.IssueMode in (select id from @IssueModesList))
	AND (@InsuredName is null or @InsuredName ='' or lower(p.InsuredName) like '%'+ lower(@InsuredName) +'%')
	AND (@InsuredMobile is null or @InsuredMobile = '' or lower(p.InsuredMobile) like '%'+ lower(@InsuredMobile) +'%')
	AND (@VehicleNumber is null or @VehicleNumber = '' or lower(p.RegistrationNo) like '%'+ lower(@VehicleNumber) +'%')
	AND (@PolicyNumber is null or @PolicyNumber = '' or @PolicyNumber = '' or lower(p.PolicyNumber) like '%'+ lower(@PolicyNumber) +'%')
	AND (@RED_End is null or p.RED <= @RED_End)
	AND (@RED_Start is null or p.RED >= @RED_Start)
	AND (@RSD_End is null or p.RSD <= @RSD_End)
	AND (@RSD_Start is null or p.RSD >= @RSD_Start)
END

--DECLARE @statuslist IntegersList;
--DECLARE @userlist IntegersList;
  
----INSERT INTO @statuslist VALUES (1);
----INSERT INTO @userlist VALUES (4),(1);

--exec GetPoliciesByCriteria @statuslist, @userlist