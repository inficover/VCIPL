CREATE PROCEDURE [dbo].[GetRequestMasterData]
	
AS
begin

select * from dbo.VehiclesType

select * from dbo.AddOns

select * from dbo.CaseTypes

select * from dbo.FuelTypes

select * from dbo.Makes

select * from dbo.NCBDiscount

select * from dbo.PolicyTypes

select * from dbo.PrefferedInsurers

select * from dbo.PreviousInsurers

select * from dbo.RTO
select * from dbo.Variants

select * from dbo.Request_Type

select * from RequestStatus



end
