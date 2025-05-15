create table if not exists user
(
    id bigint auto_increment not null primary key,
    first_name varchar(80) not null,
    last_name varchar(80) not null,
    email varchar(100) not null,
    password varchar(100) not null,
    phone varchar(20) not null,
    city varchar(80) not null
);