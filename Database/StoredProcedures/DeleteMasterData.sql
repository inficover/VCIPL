CREATE PROCEDURE [dbo].[DeleteMasterData]
	@Type varchar(100),
	@TypeId int

AS
Begin

if @Type = 'Brokers'
begin
	delete from Brokers where Id = @TypeId
end
else if @Type = 'PolicyTypes'
begin
	delete from PolicyTypes where Id = @TypeId
end
else if @Type = 'FuelTypes'
begin
	delete from FuelTypes where Id = @TypeId
end
else if @Type = 'Insurers'
begin
	delete from Insurers where Id = @TypeId
end
end