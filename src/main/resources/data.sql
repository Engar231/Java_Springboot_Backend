insert into permissions(permission_type)
select 'ADMIN'
where not exists(Select 1 from permissions where permission_type='ADMIN');

/*Inserendo un GUEST*/
insert into permissions(permission_type)
select 'GUEST'
where not exists(Select 1 from permissions where permission_type='GUEST');