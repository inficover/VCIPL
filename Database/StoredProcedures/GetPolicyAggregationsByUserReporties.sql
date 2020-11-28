CREATE PROCEDURE [dbo].[GetPolicyAggregationsByUserReporties]
	@userId int

AS
BEGIN

declare @id int,
	@name varchar(100);


DECLARE @getid CURSOR


create table ##emp (
	id int,
	createdBy int,
	userName varchar(100),
	level int
	)

create table ##Results (
	id int,
	name varchar(100),
	GrossPremium decimal,
	NetPremium int, ODPremium int,
	NoOfReports int, NoOfPolicies int, CommisionEarned int
	)
SET @getid = CURSOR FOR
SELECT id, name from Users where CreatedBy = @userId or id = @userId

OPEN @getid
FETCH NEXT
FROM @getid INTO @id, @name
WHILE @@FETCH_STATUS = 0
BEGIN
    delete from ##emp
    insert into ##emp exec GetUserHierarchyById @id
    
	--select * from ##emp
	
	insert into ##Results 
	select @id as Id, @name as name, sum(p.GrossPremium) as GrossPremium, sum(p.NetPremium) as NetPremium , sum(p.ODPremium) as ODPremium
	, (select count(id) - 1 from ##emp) as NoOfReports
	, count(p.id) as NoOfPolicies
	, sum(po.PayoutAmount) as CommisionEarned
	from Policy p inner join Policy_Payout po on p.id = po.PolicyId
	where p.CreatedBy in (select id from ##emp)  or p.CreatedBy = @id

	FETCH NEXT
    FROM @getid INTO @id, @name
	
END

CLOSE @getid
DEALLOCATE @getid

select * from ##Results

drop table ##emp
drop table ##Results

END