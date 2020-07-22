CREATE PROCEDURE [dbo].[BulkVehicleUpload]
	@BulkVehicleAddTable BulkVehicleAddTable readonly
	
AS
Begin
Declare @Generatedid int,
    @counter INT = 1,
    @max INT = 0,
	@message varchar(50),
	@currentVehicleType varchar(50),
	@currentMake varchar(50),
	@currentModel varchar(50),
	@currentVariant varchar(50),
	@currentVehicleTypeId int,
	@currentMakeId int,
	@currentModelId int,
	@currentVariantId int,
	@result int;

SELECT @max = COUNT(*) FROM @BulkVehicleAddTable

WHILE @counter <= @max
BEGIN
	select 
		@currentVehicleType = VehicleType, 
		@currentMake = Make,
		@currentModel = Model,
		@currentVariant = Variant
		
		from @BulkVehicleAddTable where id = @counter

	begin try
		select @currentVehicleTypeId = id from VehiclesType where trim(lower(name)) = trim(lower(@currentVehicleType))
		if @currentVariantId is null
		begin
			insert into VehiclesType values(@currentVehicleType)
			SELECT @currentVehicleTypeId = IDENT_CURRENT('VehiclesType')
		end

		select @currentMakeId = id from Makes where trim(lower(name)) = trim(lower(@currentMake)) and VehiclesTypeId = @currentVehicleTypeId
		if @currentMakeId is null
		begin
			insert into Makes values(@currentMake)
			SELECT @currentMakeId = IDENT_CURRENT('Makes')
		end

		select @currentModelId = id from Models where trim(lower(name)) = trim(lower(@currentModel)) and MakeId = @currentMakeId
		if @currentModelId is null
		begin
			insert into Models values(@currentModel)
			SELECT @currentModelId = IDENT_CURRENT('Models')
		end

		select @currentVariantId = id from Variants where trim(lower(name)) = trim(lower(@currentModel)) and ModelId = @currentModelId
		if @currentVariantId is null
		begin
			insert into Variants values(@currentVariant)
			set @message = 'Added'
			set @result = 1
		end
		else
		begin
			set @message = 'Vehicle already available'
			set @result = 2
		end
	end try
	begin catch
		set @message = ERROR_MESSAGE()
		set @result = 3
	end catch

	
	update  @BulkVehicleAddTable set message = @message , result = @result where id = @counter

	set @message = null
	SET @counter = @counter + 1
END

select * from @BulkVehicleAddTable

end