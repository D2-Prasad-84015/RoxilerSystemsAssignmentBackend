create database StoreApp;

use StoreApp;

Create table user(
  userId int primary key auto_increment,
  name varchar(60),
  email varchar(50),
  password varchar(100),
  address varchar(400),
  role ENUM("admin","user","store_owner") default "user"
);

create table store(
  storeId int primary key auto_increment,
  name varchar(60),
  email varchar(50),
  address varchar(100),
  ownerId int ,foreign key(ownerId) references user(userId)
);


create table rating(
  ratingId int primary key auto_increment,
  userId int,  foreign key(userId) references user(userId),
  storeId int,  foreign key(storeId) references store(storeId),
  rating int
 );
