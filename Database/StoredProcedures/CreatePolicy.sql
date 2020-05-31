CREATE PROCEDURE [dbo].[CreatePolicy]
	@Id INT,
	@VehicleType INT,
	@PolicyType INT,
	@PolicyIssuenceDate date,
	@RegistrationNo varchar(50),
	@Make INT,
	@Model INT,
	@Variant INT,
	@FuelType INT,
	@AddOnPremium decimal,
	@Comments varchar(1000),
	@InsuredName varchar(50),
	@InsuredMobile varchar(10),
	@Insurer INT,
	@PatmentMode INT,
	@PatmentModeOthers varchar(50),
	@ODPremium decimal,
	@NetPremium decimal,
	@GrossPremium decimal,
	@Broker INT,
	@Status INT,
	@CreatedBy INT
AS
Begin

IF @Status IS NULL
	SET @Status = 1;

Declare @Generatedid int;
insert into  dbo.[Policy] (
	[VehicleType],
	[PolicyType] ,
	[PolicyIssuenceDate] ,
	[RegistrationNo] ,
	[Make] ,
	[Model] ,
	[Variant] ,
	[FuelType] ,
	[AddOnPremium] ,
	[InsuredName],
	[InsuredMobile],
	[Insurer],
	[PatmentMode],
	[PatmentModeOthers],
	[ODPremium],
	[NetPremium],
	[GrossPremium],
	[Broker],
	[Status],
	[CreatedBy]
) values (
    @VehicleType,
	@PolicyType ,
	@PolicyIssuenceDate,
	@RegistrationNo,
	@Make ,
	@Model ,
	@Variant ,
	@FuelType ,
	@AddOnPremium ,
	@InsuredName,
	@InsuredMobile,
	@Insurer,
	@PatmentMode,
	@PatmentModeOthers,
	@ODPremium,
	@NetPremium,
	@GrossPremium,
	@Broker,
	@Status,
	@CreatedBy
)

SELECT @Generatedid = SCOPE_IDENTITY(); 

if @Comments is not null
begin
insert into Policy_Comments (PolicyId,Comments,CreatedBy) values (@Generatedid,@Comments,@CreatedBy);
end

--if @Status <> 1
--begin
--insert into Request_Status_log values (@Generatedid,@CreatedBy,@Status,GETDATE());
--end


exec GetPolicyById @Generatedid;
end
