/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

if not exists(select 1 from Roles)
begin
insert into Roles values ('Admin');

insert into Roles values ('Back Office');

insert into Roles values ('Zonal manager');

insert into Roles values ('Regional Manager');

insert into Roles values ('Agency');

insert into Roles values ('Agent');


end

if not exists(select 1 from UserStatus)
begin
insert into UserStatus values ('Created')

insert into UserStatus values ('Registered')

insert into UserStatus values ('Submitted')

insert into UserStatus values ('Approved')

insert into UserStatus values ('Rejected')


end

if not exists(select 1 from RequestStatus)
begin
insert into RequestStatus values ('Draft')

insert into RequestStatus values ('Submitted')

insert into RequestStatus values ('Payment Link Sent')

insert into RequestStatus values ('Quote Sent')

insert into RequestStatus values ('Converting Quote to Policy Insurance')

insert into RequestStatus values ('Policy Mapped')

insert into RequestStatus values ('Mapping Approved')

insert into RequestStatus values ('Mapping Rejected')

insert into RequestStatus values ('Payment Settled')
end

if not exists(select 1 from Request_Type)
begin

insert into Request_Type values ('Offine Quote')

insert into Request_Type values ('Direct Policy')

end

if not exists(select 1 from CaseTypes)
begin
insert into CaseTypes values ('Toyota 4Runner')

insert into CaseTypes values ('RollOver')

end





if not exists(select 1 from RTO)
begin
insert into RTO values ('Hyderabad')
end

if not exists(select 1 from PreviousInsurers)
begin
insert into PreviousInsurers values ('Samaira')

insert into PreviousInsurers values ('Anika')
end

if not exists(select 1 from NCBDiscount)
begin
insert into NCBDiscount values (50)

insert into NCBDiscount values (100)
end

if not exists(select 1 from PrefferedInsurers)
begin
insert into PrefferedInsurers values ('Tanya')

insert into PrefferedInsurers values ('Rohan')
end
if not exists(select 1 from AddOns)
begin
insert into AddOns values ('Engine Protect Cover')

insert into AddOns values ('NCB Protect Cover')

insert into AddOns values ('Return to Invoice Cover')
end 
if not exists(select 1 from Users where Id=1)
begin
insert into Users values ('admin', 'password','admin@gmail.com','123456789',null, 0, 1, 4, 'I am the admin', null);
end

if not exists(select 1 from User_Roles where UserId=1)
begin
insert into User_Roles values (1, 1);
end

if not exists(select 1 from PolicyStatus)
begin
insert into PolicyStatus values ('Draft')
insert into PolicyStatus values ('Submitted')
insert into PolicyStatus values ('Approved')
insert into PolicyStatus values ('Rejected')
end
if not exists(select 1 from VehiclesType)
begin
insert into VehiclesType values ('Heavy Moter')
insert into VehiclesType values ('Light weight Moter')
end
if not exists(select 1 from PolicyTypes)
begin
insert into PolicyTypes values ('Comprehensive')
insert into PolicyTypes values ('Liability')
insert into PolicyTypes values ('Collision')
end

if not exists(select 1 from FuelTypes)
begin
insert into FuelTypes values ('Gasoline')
insert into FuelTypes values ('Diesel')
insert into FuelTypes values ('Ethanol')
end
if not exists(select 1 from Insurers)
begin
insert into Insurers values ('Royal Sundaram')
insert into Insurers values ('HDFC')
end
if not exists(select 1 from PaymentModes)
begin
insert into PaymentModes values ('Online')
insert into PaymentModes values ('Cheque')
insert into PaymentModes values ('Others')
end
if not exists(select 1 from Brokers)
begin
insert into Brokers values ('B1')
insert into Brokers values ('B2')

end

if not exists(select 1 from PolicyRenewalNotificationStatus)
begin
insert into PolicyRenewalNotificationStatus values ('Created')
insert into PolicyRenewalNotificationStatus values ('Following up')
insert into PolicyRenewalNotificationStatus values ('Dismissed')

end

--if not exists(select 1 from Makes)
--begin
--insert into Makes values ('Maruthi')
--    insert into Models values(IDENT_CURRENT('Makes'), 'Swift')
--        insert into Models values(IDENT_CURRENT('Models'), 'LXI')
--        insert into Models values(IDENT_CURRENT('Models'), 'VXI')
--        insert into Models values(IDENT_CURRENT('Models'), 'ZXI')
        
--    insert into Models values(IDENT_CURRENT('Makes'), 'Celerio')
--        insert into Models values(IDENT_CURRENT('Models'), 'LXI')
--        insert into Models values(IDENT_CURRENT('Models'), 'VXI')
--        insert into Models values(IDENT_CURRENT('Models'), 'ZXI')
--end




