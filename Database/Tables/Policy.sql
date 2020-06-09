CREATE TABLE [dbo].[Policy]
(
	[Id] INT NOT NULL Identity(1,1) PRIMARY KEY,
	[VehicleType] INT  FOREIGN KEY REFERENCES VehiclesType(Id),
	[PolicyType] INT FOREIGN KEY REFERENCES PolicyTypes(Id),
	[PolicyIssuenceDate] date,
	[RegistrationNo] varchar(50),
	[PolicyNumber] varchar(50),
	[Make] INT  FOREIGN KEY REFERENCES Makes(Id),
	[Model] INT  FOREIGN KEY REFERENCES Models(Id),
	[Variant] INT  FOREIGN KEY REFERENCES Variants(Id),
	[FuelType] INT FOREIGN KEY REFERENCES FuelTypes(Id),
	[AddOnPremium] decimal,
	--add plicicy comments
	[InsuredName] varchar(50),
	[InsuredMobile] varchar(10),
	[Insurer] INT  FOREIGN KEY REFERENCES Insurers(Id),
	[PaymentMode] INT FOREIGN KEY REFERENCES PaymentModes(Id),
	[PaymentModeOthers] varchar(50),
	[ODPremium] decimal,
	[NetPremium] decimal,
	[GrossPremium] decimal,
	[Broker] INT FOREIGN KEY REFERENCES Brokers(Id),
	[Status] INT FOREIGN KEY REFERENCES PolicyStatus(Id),
	[CreatedBy] INT FOREIGN KEY REFERENCES Users(Id),
)

