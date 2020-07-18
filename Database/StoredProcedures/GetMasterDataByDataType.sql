CREATE PROCEDURE [dbo].GetMasterDataByDataType
	@ParentId int,
	@DataType varchar(50)
AS
begin

IF @DataType = 'VehiclesTypes'
BEGIN
	select Id, Name from VehiclesType
END

IF @DataType = 'Makes'
BEGIN
	select Id, Name from Makes where VehiclesTypeId = @ParentId
END

IF @DataType = 'Models'
BEGIN
	select Id, Name from Models where MakeId = @ParentId
END

IF @DataType = 'Variants'
BEGIN
	select Id, Name from Variants where ModelId = @ParentId
END

end
