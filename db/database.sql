drop database if exists userdata;
create database userdata;
use userdata;

create table user (
userid varchar(100) not null,
username varchar(50) not null,
password varchar(50) not null,
email varchar(50) not null,
type enum('user','admin') not null,
primary key (userid)
);

create table record (
heading int unsigned,
activity_type enum('IN_VEHICLE','ON_BICYCLE', 'ON_FOOT', 'RUNNING', 'STILL', 'WALKING'),
activity_confidence tinyint unsigned,
activity_timestamp timestamp not null,
vertical_accuracy int unsigned,
velocity int unsigned,
accuracy int unsigned not null,
longitude int unsigned not null,
latitude int unsigned not null,
altitude int,
record_timestamp timestamp,
userid varchar(100) not null,
primary key (activity_timestamp,userid),
constraint by_user foreign key (userid) references user(userid) on delete cascade on update cascade
);

insert into user values (0,'System Admin','c4ca4238a0b923820dcc509a6f75849b','admin@anasa.gr','admin');
insert into user values (1,'Μιχαήλ Σκωτσέζος','c4ca4238a0b923820dcc509a6f75849b','prisonmike@anasa.gr','user');
insert into user values (2,'Μαρία Ρήγκου','c4ca4238a0b923820dcc509a6f75849b','maria@anasa.gr','user');
insert into user values (3,'Χρήστος Μακρής','c4ca4238a0b923820dcc509a6f75849b','makris@anasa.gr','user');
insert into user values (4,'Leonardo Dicaprio','c4ca4238a0b923820dcc509a6f75849b','leo@anasa.gr','user');
insert into user values (5,'Γιώργος Ψυχογιός','c4ca4238a0b923820dcc509a6f75849b','phyco@anasa.gr','user');
