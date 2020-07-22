CREATE PROCEDURE [dbo].[BulkVehicleUpload]
	@BulkVehicleAddTable BulkVehicleAddTable readonly
	
AS
Begin
Declare
	@outputable BulkVehicleAddTable,
	@Generatedid int,
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
		select @currentVehicleTypeId = id from VehiclesType where lower(name) = lower(@currentVehicleType)
		if @currentVehicleTypeId is null
		begin
			insert into VehiclesType values(@currentVehicleType)
			SELECT @currentVehicleTypeId = IDENT_CURRENT('VehiclesType')
		end

		select @currentMakeId = id from Makes where lower(name) = lower(@currentMake) and VehiclesTypeId = @currentVehicleTypeId
		if @currentMakeId is null
		begin
			insert into Makes values( @currentVehicleTypeId, @currentMake)
			SELECT @currentMakeId = IDENT_CURRENT('Makes')
		end

		select @currentModelId = id from Models where lower(name) = lower(@currentModel) and MakeId = @currentMakeId
		if @currentModelId is null
		begin
			insert into Models values(@currentMakeId, @currentModel)
			SELECT @currentModelId = IDENT_CURRENT('Models')
		end

		select @currentVariantId = id from Variants where lower(name) = lower(@currentVariant) and ModelId = @currentModelId
		if @currentVariantId is null
		begin
			insert into Variants values(@currentModelId, @currentVariant)
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

	
	insert into @outputable values(@counter, @currentVehicleType, @currentMake, @currentModel, @currentVariant, @result, @message)
	--@BulkVehicleAddTable set message = @message , result = @result where id = @counter

	set @message = null
	SET @counter = @counter + 1
END

select * from @outputable

end