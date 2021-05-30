CREATE PROCEDURE [dbo].[GetQuoteMasterData]
	@insurerId int
AS
begin
	select * from PreviousInsurers_Master where Insurers_id=@insurerId
	select * from RTOMaster where Insurers_id=@insurerId
	select * from TwoWheeler_Make_Model_master where Insurers_id=@insurerId
	select * from Occupation_Master where Insurers_id=@insurerId
	select * from Nominee_Master where Insurers_id=@insurerId
end
