CREATE PROCEDURE [dbo].[RefreshNotifications]
	@UserId int
AS
Begin

declare @id int;

-- Need to revisit this write simple insert from select instead of cursor
DECLARE @getid CURSOR

SET @getid = CURSOR FOR
SELECT id from Policy where 1=1 
AND (@UserId is null or CreatedBy = @UserId)
And id not in (select id from PolicyRenewalNotification)

OPEN @getid
FETCH NEXT
FROM @getid INTO @id
WHILE @@FETCH_STATUS = 0
BEGIN
    -- EXEC stored_proc @varName=@id, @otherVarName='test', @varForName=@name
    insert into PolicyRenewalNotification(CreatedDate, PolicyId, Status) values (GETDATE(), @id, 1)

    FETCH NEXT
    FROM @getid INTO @id
END

CLOSE @getid
DEALLOCATE @getid

end

