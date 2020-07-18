CREATE PROCEDURE [dbo].[DeleteVehicle]
	@VarientId int
AS
Begin
Declare @MakeId int;
Declare @ModelId int;
Declare @VehicleTypeId int;

	select @ModelId = ModelId from Variants where id = @VarientId
	delete from Variants where id = @VarientId
	IF Not EXISTS (SELECT 1 FROM dbo.[Variants] WHERE  ModelId = @ModelId)
	BEGIN
		select @MakeId = MakeId from Models where id = @ModelId
		delete from Models where id = @ModelId
		IF Not EXISTS (SELECT 1 FROM dbo.[Models] WHERE  MakeId = @MakeId)
		BEGIN
			select @VehicleTypeId = VehiclesTypeId from Makes where id = @MakeId
			delete from Makes where id = @MakeId
			IF Not EXISTS (SELECT 1 FROM dbo.[Makes] WHERE  VehiclesTypeId = @MakeId)
			BEGIN
				delete from VehiclesType where id = @VehicleTypeId
		END
		END
	END

end