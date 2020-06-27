CREATE PROCEDURE [dbo].[AddVehicle]
	@MakeID int,
	@ModelID int,
	@VarientName varchar(50),
	@NewMakeName varchar(50),
	@NewModelName varchar(50)
	
AS
Begin
Declare @Generatedid int;
IF @MakeID = -1
BEGIN
	IF EXISTS (SELECT 1 FROM dbo.[Makes] WHERE  LOWER(Name) = LOWER(@NewMakeName))
	BEGIN
		THROW 51000, 'Make Already exists, select it from options.' , 0;
		RETURN 
	END

	insert into Makes values (@NewMakeName)
	SELECT @Generatedid = IDENT_CURRENT('Makes')

	insert into Models values (@Generatedid, @NewModelName)
	SELECT @Generatedid = IDENT_CURRENT('Models')

	insert into Variants values(@Generatedid, @VarientName)

	Select id, name from Variants where id =  IDENT_CURRENT('Variants')
END
ELSE
begin
	IF @ModelID = -1
	BEGIN
		IF EXISTS (SELECT 1 FROM dbo.[Models] WHERE  LOWER(Name) = LOWER(@NewModelName) and MakeId = @MakeID)
		BEGIN
			THROW 51000, 'Model Already exists for the selected Make, select it from options.' , 0;
			RETURN 
		END

		insert into Models values (@MakeID, @NewModelName)
		SELECT @Generatedid = IDENT_CURRENT('Models')

		insert into Variants values(@Generatedid, @VarientName)
		--Select IDENT_CURRENT('Variants') as Id
		Select id, name from Variants where id =  IDENT_CURRENT('Variants')

	END
	ELSE
	BEGIN
		insert into Variants values(@ModelID, @VarientName)
		Select id, name from Variants where id =  IDENT_CURRENT('Variants')

		--Select IDENT_CURRENT('Variants') as Id

	END
end

end