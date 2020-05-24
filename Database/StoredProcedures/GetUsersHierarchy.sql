CREATE PROCEDURE [dbo].[GetUsersHierarchy]

	@Id int
AS
begin
;WITH cte 
AS
(
  SELECT e.Name, e.id, e.UserName, e.MailId, e.CreatedBy, e.ID as sub_ID , e.IsActive  
  FROM Users e 
  --where id = @Id
  -- no WHERE-condition to get all employees
  UNION ALL
  SELECT 
     c.Name, c.id, c.UserName, c.MailId, e.CreatedBy,  -- keep the initial employee
     e.ID as sub_ID, e.IsActive
  FROM Users e
    INNER JOIN cte c ON c.sub_ID = e.CreatedBy
)
--select * from cte order by 1 desc;
SELECT 
    c.Name, c.id, c.UserName, c.MailId,
	--c.CreatedBy,
	count(*) as reporteesCount,
	sum(case when c.id = c.CreatedBy then 1 else 0 end) as directReporteesCount,
	sum(case when c.IsActive = 1 then 1 else 0 end) as activecount,
	sum(case when c.IsActive = 0 then 1 else 0 end) as inactivecount,
    createdBy = (SELECT CreatedBy FROM Users u  WHERE u.id = C.Id)
    -- parent level
   -- ,sum(case when c.id =  s.EmployeeID then s.Quantity else 0 end) AS ParentSumSales
    -- child level
    --,sum(case when c.id <> s.EmployeeID then s.Quantity else 0 end) AS ChildSumSales
FROM cte c 
--LEFT JOIN @Sales as s
--ON s.EmployeeID = c.sub_ID
group by c.Name, c.id, c.UserName, c.MailId order by id
end