CREATE PROCEDURE [dbo].[SubmitRequest]
    @Id INT, 
	@RegistrationNo varchar(50),
	@ManufacturingDate date,
	@RegistrationDate date,
	@RTO int,
	@PolicyExpiryDate date,	
	@Comments Varchar(1000),
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
	@RequestType int,
	@CaseType int,
	@Status int,
	@CreatedBy int
AS
	  BEGIN 
      UPDATE Request 
	  SET  RegistrationNo = @RegistrationNo,
	  ManufacturingDate = @ManufacturingDate,
	  RegistrationDate = @RegistrationDate,
	  RTO = @RTO,
	  PolicyExpiryDate = @PolicyExpiryDate,
	  ClaimTaken = @ClaimTaken,
	  PolicyType = @PolicyType, 
	  FuelType = @FuelType,
	  AddOn = @AddOn,
	  Make = @Make,
  	  Discount = @Discount,
	  PrefferedIDV = @PrefferedIDV,
	  PrefferedInsurer = @PrefferedInsurer,
	  PreviousInsurer = @PreviousInsurer,
	  Variant =@Variant,
	  RequestType= @RequestType,
	  VehicleType = @VehicleType,
	  CaseType = @CaseType,
	  Status = @Status 

 WHERE  id = @Id; 

 insert into Request_Status_log values (@Id, @CreatedBy,@Status, GETDATE());

 exec GetRequestById @Id
 END