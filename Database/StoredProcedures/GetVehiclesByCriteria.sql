CREATE PROCEDURE [dbo].[GetVehiclesByCriteria]
	@VehicleTypesList IntegersList readonly,
	@MakesList IntegersList readonly,
	@ModelsList IntegersList readonly,
	@VarientsList IntegersList readonly
AS
BEGIN
	declare @vTypesCount int
	declare @makesCount int
	declare @modelsCount int
	declare @varientsCount int

	select @vTypesCount = count(*) from @VehicleTypesList
	select @makesCount = count(*) from @MakesList
	select @varientsCount = count(*) from @ModelsList
	select @modelsCount = count(*) from @VarientsList

	select vt.name as VehicleType, vt.id as VehicleTypeId, m.name as Make, m.id as MakeId,  md.name as Model, md.Id as ModelId, v.name as Varient, v.Id as VarientId from  VehiclesType vt
	inner join makes m  on m.VehiclesTypeId = vt.Id
	inner join Models md on md.MakeId = m.Id
	inner join Variants v on v.ModelId = md.Id

	where 1 = 1
	AND (@vTypesCount = 0 or vt.Id in (select id from @VehicleTypesList))
	AND (@makesCount = 0 or m.Id in (select id from @MakesList))
	AND (@varientsCount = 0 or md.Id in (select id from @ModelsList))
	AND (@modelsCount = 0 or v.Id in (select id from @VarientsList))
END



--DECLARE @mkList IntegersList;
--DECLARE @mdList IntegersList;
--DECLARE @VList IntegersList;
  
--INSERT INTO @mkList VALUES (1),(2);
--INSERT INTO @mdList VALUES (1), (9);

--exec [GetVehiclesByCriteria] @mkList, @mdList, @VList

--Select * from Makes
--Select * from Models
--Select * from Variants