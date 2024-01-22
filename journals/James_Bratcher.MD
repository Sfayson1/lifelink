# James Bratcher's journal
## 4
1/20/2024: Wanted to spend ~2 hours today to look at the Post model and endpoints. Primarily focused on the code for create_post. Was able to get create_post to work, then was able to have create_post to require a user login. Now upon submission "user_id" is not pulled from the user logged in, will need to work on this. As of right now, when using pgAdmin, the following code is needed in the SQL query to generate the "posts" table:

CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	content VARCHAR,
    date_posted DATE,
	user_id VARCHAR
);

## 3
1/19/2024: Was stuck on update_user, able to figure it out, had to create a new model. Ready to git add, commit, and push. Going to have the team pull and double check it to make sure there are no other bugs. Going to see where Zack is on post 

## 2
1/18/2024: Had to debug the authentication for creating user and getting user. At end of day, Create_user, Get_all, and Get_user are completed and tested, Debugging update User. Error I receive is

2024-01-18 17:07:03 column "password" of relation "users" does not exist
2024-01-18 17:07:03 LINE 6:                             , password = $4

Talking to SEIR Eli Spicer, he recommended I create an update query which essentially does the same as create but updates the table. I'll have to try this tomorrow.


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