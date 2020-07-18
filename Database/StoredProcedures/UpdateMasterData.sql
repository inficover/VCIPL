CREATE PROCEDURE [dbo].[UpdateMasterData]
	@Type varchar(100),
	@TypeId int,
	@Name varchar(100)

AS
Begin

if @Type = 'Brokers'
begin
	update Brokers set Name = @Name where Id = @TypeId
end
else if @Type = 'PolicyTypes'
begin
	update PolicyTypes set Name = @Name where Id = @TypeId
end
else if @Type = 'FuelTypes'
begin
	update FuelTypes set Name = @Name where Id = @TypeId
end
else if @Type = 'Insurers'
begin
	update Insurers set Name = @Name where Id = @TypeId
end
end