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

insert into RequestStatus values ('Draft')

insert into RequestStatus values ('Submitted')

insert into RequestStatus values ('Payment Link Sent')

insert into RequestStatus values ('Quote Sent')

insert into RequestStatus values ('Converting Quote to Policy Insurance')

insert into RequestStatus values ('Policy Mapped')

insert into RequestStatus values ('Mapping Approved')

insert into RequestStatus values ('Mapping Rejected')

insert into RequestStatus values ('Payment Settled')

insert into Request_Type values ('Offine Quote')

insert into Request_Type values ('Direct Policy')

insert into CaseTypes values ('Toyota 4Runner')

insert into CaseTypes values ('RollOver')







insert into Variants values ('Audi A7')

insert into Variants values ('BMW X4')

insert into Variants values ('Honda Civic')

insert into RTO values ('Hyderabad')

insert into PreviousInsurers values ('Samaira')

insert into PreviousInsurers values ('Anika')

insert into NCBDiscount values (50)

insert into NCBDiscount values (100)

insert into PrefferedInsurers values ('Tanya')

insert into PrefferedInsurers values ('Rohan')

insert into AddOns values ('Engine Protect Cover')

insert into AddOns values ('NCB Protect Cover')

insert into AddOns values ('Return to Invoice Cover')

if not exists(select 1 from Users where Id=1)
begin
insert into Users values ('admin', 'password','admin@gmail.com','123456789',null, 0, 1, 4, 'I am the admin', null);
end

if not exists(select 1 from User_Roles where UserId=1)
begin
insert into User_Roles values (1, 1);
end


insert into PolicyStatus values ('Draft')
insert into PolicyStatus values ('Submitted')
insert into PolicyStatus values ('Approved')
insert into PolicyStatus values ('Rejected')

insert into VehiclesType values ('Heavy Moter')
insert into VehiclesType values ('Light weight Moter')

insert into PolicyTypes values ('Comprehensive')
insert into PolicyTypes values ('Liability')
insert into PolicyTypes values ('Collision')

insert into Makes values ('Audi')
insert into Makes values ('BMW')
insert into Makes values ('Honda')

insert into FuelTypes values ('Gasoline')
insert into FuelTypes values ('Diesel')
insert into FuelTypes values ('Ethanol')

insert into Insurers values ('Royal Sundaram')
insert into Insurers values ('HDFC')

insert into PaymentModes values ('Online')
insert into PaymentModes values ('Cheque')
insert into PaymentModes values ('Others')

insert into Brokers values ('B1')
insert into Brokers values ('B2')





