/**
 * Can be used to construct the data for the Set Operations examples. Can be used in a scratchpad with the sync script, or elsewhere.
 */

CREATE TABLE companies (
    id integer,
    company_name varchar(30),
    city varchar(30),
    industry varchar(30),
    employee_count bigint,
    founded_date date
);

INSERT INTO companies (id, company_name, city, industry, employee_count, founded_date)
VALUES (1,'Clamazon','Sea-attle','Shell Corporations', 11030500, '1994-07-05'),
(2,'Sharks and Spencer','Swimchester','Fin-tech', 4230, '1884-03-05'),
(3,'sEabay','Swellington','Digital Sharketing', 52310, '1995-09-03'),
(4,'Algi','Codham','Eelectricity', 2103203, '1946-07-10'),
(5,'Microsurfed','Sea-attle','Digital Sharketing', 20131210, '1975-04-04')
;

CREATE TABLE fortuna_500 (
    id integer,
    company_name varchar(30),
    headquarters varchar(30)
);

INSERT INTO fortuna_500 (id, company_name, headquarters)
VALUES (1,'Clamazon','Sea-attle'),
(2,'Microsurfed','Sea-attle'),
(3,'sEabay','Swellington'),
(4,'Shell','London')
;

CREATE TABLE employees (
    id integer,
    employee_name varchar(30),
    company_id integer
);

INSERT INTO employees (id, employee_name, company_id)
VALUES (1,'Pike Myers',1),
(2,'Prince Whaleiam',1),
(3,'Skate Winslet',3),
(4,'Shark Ruffalo',NULL);

-- SELECT statements here

ALTER TABLE employees
ADD COLUMN previous_company_id INTEGER;
UPDATE employees SET previous_company_id = 3 WHERE employee_name = 'Pike Myers';
UPDATE employees SET previous_company_id = 6 WHERE employee_name = 'Prince Whaleiam';

--SELECT incl previous_company_id

INSERT INTO companies (id, company_name, founded_date)
VALUES (6,'Nineties PLC', '1990-01-01'),
(7,'Millennium Ltd', '2000-01-01')
;


CREATE TABLE cities (
    city_name VARCHAR(30),
    country VARCHAR(30)
);

INSERT INTO cities
VALUES ('London', 'UK'),
('Boston', 'UK'),
('Boston', 'USA'),
('New York', 'USA'),
('Barcelona', 'Spain');

--SELECTs including cities
