CREATE PROCEDURE [dbo].[BulkMasterDataUpload]
	@Type varchar(100),
	@Input BulkMasterDataAddList readonly

AS
Begin

Declare
	@outputable BulkMasterDataAddList,
	@currentName varchar(50),
	@message varchar(1000),
	@result int,
	@counter int =1,
	@max int =0,
	@id int;

IF @Type = 'Brokers'
begin
	SELECT @max = COUNT(*) FROM @Input

	WHILE @counter <= @max
	BEGIN
		select @currentName = name from @input where id = @counter
		select @id = id from Brokers where lower(name) = lower(@currentName)
		if @id is null 
		begin
			insert into Brokers values(@currentName);
			set @message = 'Added'
			set @result = 1
		end
		else
		begin
			set @message = 'already available'
			set @result = 2
		end

		insert into @outputable values(@counter, @currentName, @result, @message)

		SET @counter = @counter + 1
		set @currentName = null;
		set @id = null;
	END
END

IF @Type = 'PolicyTypes'
begin
	SELECT @max = COUNT(*) FROM @Input

	WHILE @counter <= @max
	BEGIN
		select @currentName = name from @input where id = @counter
		select @id = id from PolicyTypes where lower(name) = lower(@currentName)
		if @id is null 
		begin
			insert into PolicyTypes values(@currentName);
			set @message = 'Added'
			set @result = 1
		end
		else
		begin
			set @message = 'already available'
			set @result = 2
		end

		insert into @outputable values(@counter, @currentName, @result, @message)

		SET @counter = @counter + 1
		set @currentName = null;
		set @id = null;
	END
END

IF @Type = 'FuelTypes'
begin
	SELECT @max = COUNT(*) FROM @Input

	WHILE @counter <= @max
	BEGIN
		select @currentName = name from @input where id = @counter
		select @id = id from FuelTypes where lower(name) = lower(@currentName)
		if @id is null 
		begin
			insert into FuelTypes values(@currentName);
			set @message = 'Added'
			set @result = 1
		end
		else
		begin
			set @message = 'already available'
			set @result = 2
		end

		insert into @outputable values(@counter, @currentName, @result, @message)

		SET @counter = @counter + 1
		set @currentName = null;
		set @id = null;
	END
END

IF @Type = 'Insurers'
begin
	SELECT @max = COUNT(*) FROM @Input

	WHILE @counter <= @max
	BEGIN
		select @currentName = name from @input where id = @counter
		select @id = id from Insurers where lower(name) = lower(@currentName)
		if @id is null 
		begin
			insert into Insurers values(@currentName);
			set @message = 'Added'
			set @result = 1
		end
		else
		begin
			set @message = 'already available'
			set @result = 2
		end

		insert into @outputable values(@counter, @currentName, @result, @message)

		SET @counter = @counter + 1
		set @currentName = null;
		set @id = null;
	END
END

select * from @outputable
end
