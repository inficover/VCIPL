
CREATE PROCEDURE [dbo].[GetUserParentHierarchyById]

	@UserId int
AS
begin

WITH UserTree AS
(
	SELECT u.id, u.CreatedBy, u.UserName, u.Payout as PayoutPercentage,  0 AS DEPTH
	FROM users u
	WHERE u.id = @UserId

	UNION ALL

	SELECT  u.id, u.CreatedBy, u.UserName, u.Payout as PayoutPercentage, DEPTH + 1
	FROM users u
	JOIN UserTree ut ON ut.CreatedBy = u.id
)

SELECT *, MAX(DEPTH) OVER() - DEPTH + 1 AS CorrectDepth

FROM UserTree where id <> 1

end