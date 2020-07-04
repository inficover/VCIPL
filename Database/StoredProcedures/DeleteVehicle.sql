CREATE PROCEDURE [dbo].[DeleteVehicle]
	@VarientId int
AS
Begin
Declare @MakeId int;
Declare @ModelId int;

	select @ModelId = ModelId from Variants where id = @VarientId
	delete from Variants where id = @VarientId
	IF Not EXISTS (SELECT 1 FROM dbo.[Variants] WHERE  ModelId = @ModelId)
	BEGIN
		-- print('models deos nt exist deleting the model')
		select @MakeId = MakeId from Models where id = @ModelId
		delete from Models where id = @ModelId
		IF Not EXISTS (SELECT 1 FROM dbo.[Models] WHERE  MakeId = @MakeId)
		BEGIN
		-- print('makes deos nt exist deleting the make')
			delete from Makes where id = @MakeId
		END
	END

end