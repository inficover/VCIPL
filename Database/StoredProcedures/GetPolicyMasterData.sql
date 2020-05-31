CREATE PROCEDURE [dbo].[GetPolicyMasterData]
	
AS
begin

select * from dbo.VehiclesType
select * from dbo.PolicyTypes

select * from dbo.Makes
--select * from dbo.Models
--select * from dbo.Variants

select * from dbo.FuelTypes
select * from dbo.Insurers
select * from dbo.PaymentModes
select * from dbo.Brokers
select * from dbo.PolicyStatus

end
