====================================================================
Looping through result set
====================================================================

declare @userId int = 1,
	@id int,
	@name varchar(100);


DECLARE @getid CURSOR

SET @getid = CURSOR FOR
SELECT id, name from Users where CreatedBy = @userId

OPEN @getid
FETCH NEXT
FROM @getid INTO @id, @name
WHILE @@FETCH_STATUS = 0
BEGIN
    -- EXEC stored_proc @varName=@id, @otherVarName='test', @varForName=@name
    print @name

    FETCH NEXT
    FROM @getid INTO @id, @name
END

CLOSE @getid
DEALLOCATE @getid
---------------------------------------------------------------------------


==========================================================================
Getting Last inserted id of a table
==========================================================================

IDENT_CURRENT('Models')
--------------------------------------------------------------------------

==========================================================================
Insert Date
==========================================================================

GETDATE()
--------------------------------------------------------------------------

==========================================================================
Get First Day of theMonth
==========================================================================

DATEADD(DAY,1-DATEPART(DAY,red),red)

More details : https://www.mssqltips.com/sqlservertip/6088/simplify-date-period-calculations-in-sql-server/
--------------------------------------------------------------------------

