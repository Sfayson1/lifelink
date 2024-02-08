# James Bratcher's journal

## 16
2/8/2024: Filled the group in on deploying, how much fun it was, and the necessary changes that will be needed to ensure their new .jsx files are ready for deployment. Zack worked on fixing the clash of CSS and bootstrap that made our application fail (sizing of elements were wrong and overlapping, navbar would disapear when too many posts were made, text box was bigger than what appeared as the text would wrap, but a good few inches past the end of the box). Sherika and I worked on our unit tests, we both had our tests pass locally, but when sent to the pipeline for deployment we got an "ERROR tests/test_users.py - KeyError: 'SIGNING_KEY'". Sherika saved the day when she made a small change to the authenticator file, changing the code from

authenticator = LifeLinkAuthenticator(os.environ["SIGNING_KEY"])

to

authenticator = LifeLinkAuthenticator(os.environ.get("SIGNING_KEY"))

I was reluctant at first about this change as I was worried it would change the way the app behaved with login and sign ups, but with further testing it seemed to have made no real change, and the token/cookie still remained in the developer tools. 

## 15
2/7/2024: Today's theme is CI/CD. Spent all day working on it, followed the learn card step by step to set it up but ended up with a 404 error. Enlisted the help of Eli and we were able to get a black page going with no errors, mainly involved the VITE_API_HOST, VITE_PUBLIC_HOST, and baseUrl. Marce entered to assist with troubleshooting why we were getting an error-less black page. VITE_PUBLIC_URL has to be the URL that loads when you load your page, VITE_API_HOST replaces your localhost:8000 in your front end endpoints, and theres much more that I cant really remember off the top of my head, I'll remember and update when I explain it to Sherika and Zack tomorrow. We are deployed. Need to redo my unit tests, they kept failing the pipeline and ultimately failed the front end from loading.

## 14
2/6/2024: Today's focus was CI/CD, following the steps, this led me to to have to complete the unit test first. Completed unit test around testing for if the get_all (users) endpoint worked. Back to CI/CD.

## 13
2/5/2024: Work done over the weekend changed the backend and broke some of the endpoints. Testing completed, I'd say 70% of endpoints didnt work properly now. Most of the day was spent debugging. Able to get it working by end of day, the models changed and such the endpoints needed to match the models appropriately. Started CI/CD, didnt get very far though.

## 12
2/1/2024: Added delete to the update user page, may want to consider adding another page to confirm, right now its deleted the second you click. Login's redirect to home vs error message was a challenge, required thomas and eli to get it to work. The ultimate fix was to use the useAuthContext from '@galvanize-inc/jwtdown-for-react' and put the token finder/navigator in the useEffect. Sign up redirect needs to be done, pretty sure it'll be the same set up.

## 11
1/30/2024: Worked Routers with Zack while Leah and Sherika worked on "homepage before sign in". Routers went quick, we ran into a large slew of issues when testing log in, referred to Eli (seir) for help. He directed us to jwtdown-for-react documentation. It helped us out greatly until we came across a much bigger issue, two syntax errors when loading (that gave us no direction on where to go) and when trying to log in, getting a POST 404, syntaxerror, and error: failed to get token after login. got undefined. Dalonte came in and helped out. It took a while, but the problem was fixed with a "<AuthProvider baseUrl={baseUrl}>" in App.jsx. Working UpdateUser now, I need to try and make it so you have to be logged in to update the user's profile.

## 10
1/29/2024: During testing, noticed that if you allow the users to update username, the posts remain connected to the old username. Adjusted update_user endpoint to not allow username update.

## 9
1/26/2024: same as 1/25/2024, minimal gains made.

## 8
1/25/2024: finished up front end for login/sign up endpoints, helping sherika with show user's page/posts, getting a "user_id not defined"

## 7
1/24/2024: Assisted Leah with update_post, we're able to get it done. Testing completed on all Endpoints and Auths, made 10 Users with 10 Posts each, Everything works as advertised.

## 6
1/23/2024: Worked on get_user_posts today with Zack, spent most of the day on it. Kept hitting an error:
2024-01-23 15:40:54 psycopg.errors.UndefinedFunction: operator does not exist: character varying = integer
2024-01-23 15:40:54 LINE 4:                     WHERE user_id = $1::int;
2024-01-23 15:40:54                                           ^
2024-01-23 15:40:54 HINT:  No operator matches the given name and argument types. You might need to add explicit type casts.
Both Zack and I found out different fixes at about the same time, we decided to go with his fix and put mine in a separate branch "Backup" in case we needed it. We're going to assist Leah and Sherika with update_post and get_mine tomorrow.

## 5
1/22/2024: Debugging madness, worked with Zack, Leah, and Sherika to try and get the User endpoints to work with their databases. Turns out you have to use postgres-data instead of postgres in pgadmin. Verified everything worked by end of day. Onto Posts.

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
