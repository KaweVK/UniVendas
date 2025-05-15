create table if not exists item
(
    id bigint auto_increment not null primary key,
    name varchar(80) not null,
    description text,
    amount bigint not null,
    price double not null
);