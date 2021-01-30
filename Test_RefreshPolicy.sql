select id, red,  DATEADD(DAY, 30,red),  
DateAdd(YEAR, -1, DATEADD(DAY, 30,red)),
DATEDIFF(DAY, red, DateAdd(YEAR, -1, DATEADD(DAY, 30,red))),
DATEDIFF(DAY, getDate(), DateAdd(YEAR, -1, DATEADD(DAY, 30,red))) ,
DATEDIFF(MONTH, GETDATE(), red)
from Policy

SELECT id from Policy where 1=1 
and DATEDIFF(MONTH, GETDATE(), red) = 1 
And id not in (select PolicyId from PolicyRenewalNotification)

------select * from PolicyRenewalNotification
----select * from PolicyRenewalNotificationStatus

----delete from PolicyRenewalNotification

--alter PROCEDURE [dbo].[GetPolicyRenewalNotificationByCriteria]
--	@UserId int
--	--@DirectReportId int, 
--	--@StatusList IntegersList readonly,
--	--@CreatedByList IntegersList readonly,
--	--@VehicleTypesList IntegersList readonly,
--	--@PolicyTypesList IntegersList readonly,
--	--@FuelTypesList IntegersList readonly,
--	--@IssueModesList StringsList readonly,
--	--@VehicleNumber varchar(50),
--	--@PolicyNumber varchar(50),
--	--@InsuredName varchar(50),
--	--@InsuredMobile varchar(50),
--	--@RED_Start date,
--	--@RED_End date,
--	--@RSD_Start date,
--	--@RSD_End date,
--	--@IssueDate_End date,
--	--@IssueDate_Start date,
--	--@PageNumber int,
--	--@PageSize int
--AS
--BEGIN
--	--declare @statusCount int
--	--declare @vehicleTypesCount int
--	--declare @cretaedByCount int
--	--declare @policyTypesCount int
--	--declare @fuelTypesCount int
--	--declare @issueModesCount int

--	--select @statusCount = count(*) from @StatusList
--	--select @cretaedByCount = count(*) from @CreatedByList
--	--select @vehicleTypesCount = count(*) from @VehicleTypesList
--	--select @policyTypesCount = count(*) from @PolicyTypesList
--	--select @fuelTypesCount = count(*) from @FuelTypesList
--	--select @issueModesCount = count(*) from @IssueModesList

--	-- SELECT @PageSize = COALESCE(@PageSize, 2000000000); 

--	--create table #reportees (
--	--id int,
--	--createdBy int,
--	--userName varchar(100),
--	--level int
--	--)

--	--create table #user_reportees (
--	--id int,
--	--createdBy int,
--	--userName varchar(100),
--	--level int
--	--)
	
--	--insert into #reportees exec GetUserHierarchyById @UserId
--	--insert into #user_reportees exec GetUserHierarchyById @DirectReportId

--	select  p.RegisteredDate, p.PolicyNumber, prn.id, p.id as PolicyId, p.RegistrationNo, p.GrossPremium, p.NetPremium, p.ODPremium, prn.Status as StatusId,p.CPA, p.RSD, p.RED, p.PolicyIssuenceDate,pmodes.Name as PaymentMode, p.PaymentModeOthers,
--	p.IssueMode, md.Name as Model, ve.name as Variant, pt.Name as PolicyType, p.InsuredMobile, ft.Name FuelType, ppt.PayInPercentage, ppt.PayoutAmount,
--	ppt.PayoutComment, u_ppt.name as  PayOutTo,
--	p.InsuredName, m.Name as Make, b.Name as Broker, v.Name as VehicleType,i.name as Insurer , u.name as CreatedBy  , TotalRecords = COUNT(*) OVER(),
--	prns.name as NotificationStatus 
--	from dbo.[policy] p
	
--	inner join PolicyRenewalNotification prn on prn.PolicyId = p.id
--	inner join PolicyRenewalNotificationStatus prns on prns.Id = prn.Status
	
--	left join Makes m on p.Make = m.id
--	left join Models md on p.Model = md.id
--	left join Variants ve on p.Variant = ve.id
--	left join PolicyTypes pt on p.PolicyType = pt.id
--	left join FuelTypes ft on p.FuelType = ft.id
--	left join Brokers b on p.Broker = b.Id
--	left join VehiclesType v on p.VehicleType = v.id
--	left join PaymentModes pmodes on p.PaymentMode = pmodes.id
--	left join Insurers i on p.Insurer = i.id
--	left join PolicyStatus ps on p.Status = ps.id
--	left join Users u on u.id = p.CreatedBy
--	left join Policy_Payout ppt on p.Id = ppt.PolicyId
--	left join users u_ppt on u_ppt.id = ppt.PayOutTo

--	where 1 = 1
--	--AND (p.CreatedBy in (select id from #reportees))
--	AND (p.CreatedBy = @UserId)
--	And prn.Status <> 3
--	--AND (@DirectReportId is null or p.CreatedBy in (select id from #user_reportees))
--	--AND (@statusCount = 0 or prn.Status in (select id from @StatusList))
	
--	--AND (@cretaedByCount = 0 or p.CreatedBy in (select id from @CreatedByList))
--	--AND (@vehicleTypesCount = 0 or p.VehicleType in (select id from @VehicleTypesList))
--	--AND (@policyTypesCount = 0 or p.PolicyType in (select id from @PolicyTypesList))
--	--AND (@fuelTypesCount = 0 or p.FuelType in (select id from @FuelTypesList))
--	--AND (@issueModesCount = 0 or p.IssueMode in (select id from @IssueModesList))
--	--AND (@InsuredName is null or @InsuredName ='' or lower(p.InsuredName) like '%'+ lower(@InsuredName) +'%')
--	--AND (@InsuredMobile is null or @InsuredMobile = '' or lower(p.InsuredMobile) like '%'+ lower(@InsuredMobile) +'%')
--	--AND (@VehicleNumber is null or @VehicleNumber = '' or lower(p.RegistrationNo) like '%'+ lower(@VehicleNumber) +'%')
--	--AND (@PolicyNumber is null or @PolicyNumber = '' or  lower(p.PolicyNumber) like '%'+ lower(@PolicyNumber) +'%')
--	--AND (@RED_End is null or p.RED <= @RED_End)
--	--AND (@RED_Start is null or p.RED >= @RED_Start)
--	--AND (@RSD_End is null or p.RSD <= @RSD_End)
--	--AND (@RSD_Start is null or p.RSD >= @RSD_Start)
--	--AND (@IssueDate_End is null or p.PolicyIssuenceDate <= @RSD_End)
--	--AND (@IssueDate_Start is null or p.PolicyIssuenceDate >= @RSD_Start)
--	ORDER BY 
--		prn.CreatedDate desc 
--		--OFFSET (COALESCE(@PageNumber, 1) - 1) * @PageSize ROWS FETCH NEXT @PageSize ROWS ONLY

	
--END

----DECLARE @statuslist IntegersList;
----DECLARE @userlist IntegersList;
  
------INSERT INTO @statuslist VALUES (1);
------INSERT INTO @userlist VALUES (4),(1);


----exec GetPoliciesByCriteria @statuslist, @userlist