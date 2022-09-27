create database TheInsuranceDb
use TheInsuranceDb

------------------------------------------------------------

CREATE TABLE tbl_users (
    userId  int primary key identity,
	 userName  varchar(255) not null ,
	   password    varchar(255) not null,
	   role  varchar(255) not null,
);

CREATE TABLE tbl_claim (
    claimId  int primary key identity,
	 userName  varchar(255) not null ,
	   billImageName    varchar(255) not null,
	   billImageData varbinary(max) NOT NULL

);

ALTER TABLE tbl_claim
Add policyId varchar(255);



--------------------------------------------------------------
INSERT INTO tbl_claim values ('rushi','testImage', (SELECT * FROM OPENROWSET(BULK 'C:\Users\Rushikesh\Desktop\basic.png', SINGLE_BLOB) as T1))
INSERT INTO tbl_users values ('Admin','admin@123', 'admin')
INSERT INTO tbl_users values ('John','user@123', 'user')
INSERT INTO tbl_users values ('Ethan','user@123', 'user')
select * from tbl_claim
select * from tbl_users
------------------------------------------------------------------

