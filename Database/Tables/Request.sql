CREATE TABLE [dbo].[Request]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[RegistrationNo] varchar(50),
	[ManufacturingDate] date,
	[RegistrationDate] date,
	[PolicyExpiryDate] date,
	[PrefferedIDV] varchar(50),
	[ClaimTaken] bit,
	[PolicyType] INT FOREIGN KEY REFERENCES PolicyTypes(Id),
	[FuelType] INT FOREIGN KEY REFERENCES FuelTypes(Id),
	[AddOn] INT  FOREIGN KEY REFERENCES AddOns(Id),
	[Make] INT  FOREIGN KEY REFERENCES Makes(Id),
	[Discount] INT FOREIGN KEY REFERENCES NCBDiscount(Id),
	[PrefferedInsurer] INT  FOREIGN KEY REFERENCES PrefferedInsurers(Id),
	[PreviousInsurer] INT  FOREIGN KEY REFERENCES PreviousInsurers(Id),
	[RTO] INT  FOREIGN KEY REFERENCES RTO(Id),
	[Variant] INT  FOREIGN KEY REFERENCES Variants(Id),
	[VehicleType] INT  FOREIGN KEY REFERENCES VehiclesType(Id),
	[CaseType] INT FOREIGN KEY REFERENCES CaseTypes(Id),
	[RequestType] INT FOREIGN KEY REFERENCES Request_Type(Id),
	[Status] INT FOREIGN KEY REFERENCES RequestStatus(Id),
	[CreatedBy] INT FOREIGN KEY REFERENCES Users(Id)
)

