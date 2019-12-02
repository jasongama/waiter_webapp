create table weekdays(
	id serial not null primary key,
	weekdays text not null,
	count int

);

create table waiters(
	id serial not null primary key,
    names text not null,
	weekdays_id int not null, 
	foreign key (weekdays_id) references weekdays(id)
);