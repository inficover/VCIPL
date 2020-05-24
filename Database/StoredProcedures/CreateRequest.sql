CREATE PROCEDURE [dbo].[CreateRequest]
	@Id int,
	@RegistrationNo varchar(50),
	@ManufacturingDate date,
	@RegistrationDate date,
	@RTO int,
	@PolicyExpiryDate date,	
	@Comments varchar(50),
	@ClaimTaken bit,
	@PolicyType int,
	@FuelType int,
	@AddOn int,
	@Make int,
	@Discount int,
	@PrefferedIDV varchar(50),
	@PrefferedInsurer int,
	@PreviousInsurer int,
	@Variant int,
	@VehicleType int,
	@CaseType int,
	@RequestType int,
	@Status int,
	@CreatedBy int
AS
Begin

    IF @Status IS NULL
	 SET @Status = 1;

Declare @Generatedid int;
insert into  dbo.[Request] (
	[RegistrationNo],
	[ManufacturingDate],
	[RegistrationDate],
	[RTO],
	[PolicyExpiryDate],
	[ClaimTaken],
	[PolicyType] ,
	[FuelType] ,
	[AddOn] ,
	[Make],
	[Discount] ,
	[PrefferedIDV],
	[PrefferedInsurer] ,
	[PreviousInsurer],
	[Variant] ,
	[VehicleType],
	[CaseType],
	[RequestType],
	[Status],
	[CreatedBy]
) values (
    @RegistrationNo ,
	@ManufacturingDate ,
	@RegistrationDate ,
	@RTO ,
	@PolicyExpiryDate ,	
	@ClaimTaken ,
	@PolicyType ,
	@FuelType ,
	@AddOn ,
	@Make ,
	@Discount ,
	@PrefferedIDV,
	@PrefferedInsurer ,
	@PreviousInsurer ,
	@Variant ,
	@VehicleType ,
	@CaseType ,
	@RequestType,
	@Status ,
	@CreatedBy 
)

SELECT @Generatedid = SCOPE_IDENTITY(); 

if @Comments is not null
begin
insert into Request_Comments (RequestId,Comments,CreatedBy) values (@Generatedid,@Comments,@CreatedBy);
end

if @Status <> 1
begin
insert into Request_Status_log values (@Generatedid,@CreatedBy,@Status,GETDATE());
end


exec GetRequestById @Generatedid;
end
