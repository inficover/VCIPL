CREATE FUNCTION MyFunc (
    @id INT
)
RETURNS TABLE
AS
RETURN
WITH tblChild AS
(
    SELECT *
        FROM Users WHERE createdBy = @id
    UNION ALL
    SELECT users.* FROM Users users JOIN tblChild  ON users.createdBy = tblChild.Id
)
SELECT *
    FROM tblChild

    -- Helper Queries TEMP
--    select id, CreatedBy,
--    (select count(*) from  dbo.[MyFunc](users.id)) as totalreporties, 
--    (select SUM(case when f.isactive = 1 then 1 else 0 end) from  dbo.[MyFunc](users.id) f) as activeusers 
--from users where createdby = 1 or id = 1

--select count(*) from  dbo.[MyFunc](1002)
--select * from  dbo.[MyFunc](1002)