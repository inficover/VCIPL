CREATE TYPE [dbo].[BulkVehicleAddTable] AS TABLE
(
	id int,
	VehicleType varchar(100),
	Make varchar(50),
	Model varchar(50),
	Variant varchar(50),
	Result int,
	message varchar(1000)
)

