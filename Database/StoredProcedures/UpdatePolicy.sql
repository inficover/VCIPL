CREATE PROCEDURE [dbo].[UpdatePolicy]
   @Id INT,
	@VehicleType INT,
	@PolicyType INT,
	@PolicyIssuenceDate date,
	@RegistrationNo varchar(50),
	@PolicyNumber varchar(50),
	@Make INT,
	@Model INT,
	@Variant INT,
	@FuelType INT,
	@AddOnPremium decimal,
	@Comments varchar(1000),
	@InsuredName varchar(50),
	@InsuredMobile varchar(10),
	@Insurer INT,
	@PaymentMode INT,
	@PaymentModeOthers varchar(50),
	@ODPremium decimal,
	@NetPremium decimal,
	@GrossPremium decimal,
	@Broker INT,
	@Status INT,
	@CreatedBy INT
AS
	  BEGIN 
      UPDATE Policy 
	  SET   [VehicleType]=@VehicleType,
			[PolicyType]=@PolicyType,
			[PolicyIssuenceDate]=@PolicyIssuenceDate,
			[RegistrationNo]=@RegistrationNo,
			[PolicyNumber] = @PolicyNumber,
			[Make]=@Make,
			[Model]=@Model,
			[Variant]=@Variant,
			[FuelType]=@FuelType,
			[AddOnPremium]=@AddOnPremium,
			[InsuredName]=@InsuredName,
			[InsuredMobile]=@InsuredMobile,
			[Insurer]=@Insurer,
			[PaymentMode]=@PaymentMode,
			[PaymentModeOthers]=@PaymentModeOthers,
			[ODPremium]=@ODPremium,
			[NetPremium]=@NetPremium,
			[GrossPremium]=@GrossPremium,
			[Broker]=@Broker,
			[Status]=@Status

	WHERE  id = @Id; 

	update dbo.[policy_Comments]  set Comments = @Comments where PolicyId = @Id;

 exec GetPolicyById @Id
 END