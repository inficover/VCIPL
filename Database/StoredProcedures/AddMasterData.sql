CREATE PROCEDURE [dbo].[AddMasterData]
	@Type varchar(100),
	@Name varchar(100)

AS
Begin

if @Type = 'Brokers'
begin
	insert into Brokers values(@Name)
end
else if @Type = 'PolicyTypes'
begin
	insert into PolicyTypes values(@Name)
end
else if @Type = 'FuelTypes'
begin
	insert into FuelTypes values(@Name)
end
else if @Type = 'Insurers'
begin
	insert into Insurers values(@Name)
end