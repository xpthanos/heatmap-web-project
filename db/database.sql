create database userdata;
use userdata;

create table user (
userid int unsigned not null,
username varchar(50) not null,
password varchar(50) not null,
email varchar(50) not null,
type enum('user','admin') not null,
primary key (userid)
);

create table record (
heading int unsigned,
activity_type enum('IN_VEHICLE','ON_BICYCLE', 'ON_FOOT', 'RUNNING', 'STILL', 'TILTING', 'UNKNOWN', 'WALKING') default 'UNKNOWN',
activity_confidence tinyint unsigned,
activity_timestamp datetime not null,
vertical_accuracy int unsigned,
velocity int unsigned,
accuracy int unsigned not null,
longitude int unsigned not null,
latitude int unsigned not null,
altitude int,
record_timestamp datetime,
userid int unsigned not null,
primary key (activity_timestamp,userid),
constraint by_user foreign key (userid) references user(userid) on delete cascade on update cascade
);
