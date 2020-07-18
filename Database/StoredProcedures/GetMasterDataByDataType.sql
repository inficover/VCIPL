CREATE PROCEDURE [dbo].GetMasterDataByDataType
	@ParentId int,
	@DataType varchar(50),
	@FilterText varchar(50)
AS
begin

IF @DataType = 'VehiclesTypes'
BEGIN
	select Id, Name from VehiclesType where  (@FilterText is null or name like '%' +@FilterText +'%')
END

else IF @DataType = 'Makes'
BEGIN
	select Id, Name from Makes where VehiclesTypeId = @ParentId and (@FilterText is null or name like '%' +@FilterText +'%')
END

else IF @DataType = 'Models'
BEGIN
	select Id, Name from Models where MakeId = @ParentId and (@FilterText is null or name like '%' +@FilterText +'%')
END

else IF @DataType = 'Variants'
BEGIN
	select Id, Name from Variants where ModelId = @ParentId and (@FilterText is null or name like '%' +@FilterText +'%')
END
else IF @DataType = 'Brokers'
BEGIN
	select Id, Name from Brokers where (@FilterText is null or name like '%' +@FilterText +'%')
END
else IF @DataType = 'PolicyTypes'
BEGIN
	select Id, Name from PolicyTypes where (@FilterText is null or name like '%' +@FilterText +'%')
END
else IF @DataType = 'FuelTypes'
BEGIN
	select Id, Name from FuelTypes where (@FilterText is null or name like '%' +@FilterText +'%')
END
else IF @DataType = 'Insurers'
BEGIN
	select Id, Name from Insurers where (@FilterText is null or name like '%' +@FilterText +'%')
END

end
