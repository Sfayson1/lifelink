# James Bratcher's journal


## 1
1/17/2024: Set up authentication for creating user, getting user (login), and token creation. Ran into issue of examples showing how to do it with Mongo, not Postgres. Tried to get the Create User to work with an email instead of username, kept running into a bug. Changed to use username and got a code200! Working on Get user to work. Running into error:

2024-01-18 10:40:26 pydantic.error_wrappers.ValidationError: 6 validation errors for UserOut
2024-01-18 10:40:26 response -> id
2024-01-18 10:40:26   field required (type=value_error.missing)
2024-01-18 10:40:26 response -> username
2024-01-18 10:40:26   field required (type=value_error.missing)
2024-01-18 10:40:26 response -> first_name
2024-01-18 10:40:26   field required (type=value_error.missing)
2024-01-18 10:40:26 response -> last_name
2024-01-18 10:40:26   field required (type=value_error.missing)
2024-01-18 10:40:26 response -> email
2024-01-18 10:40:26   field required (type=value_error.missing)
2024-01-18 10:40:26 response -> grad_class
2024-01-18 10:40:26   field required (type=value_error.missing)

Currently Debugging

-------------------------------------

How to pull this up on swagger

1. Pull changes from main

2. Docker compose build and Docker compose up

3. Open PgAdmin (see Zack_Hitchcock.MD for more info on set up of PgAdmin)
    3. 1. Expand "Servers", "LifeLink Database", and "Databases"
    3. 2. Right click on "postgres-data"
    3. 3. Click Query Tool
    3. 4. Under Query, enter the following:

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
	grad_class VARCHAR(255),
    hashed_password VARCHAR(255)
);

Open Swagger with http://localhost:8000/docs#/