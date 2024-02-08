# Zack Hitchcock journal


## 1
day 1: setup. had an issue with allowed owners in git group, solved by deleting project and remaking it. git has an error where if you start the project as private, you are not able to switch it to public after. (as far as i am aware.) also, you cannot have more than 5 members in a private group/private project.

to run this project with docker, **first pull the latest changes from main.**

1. open docker

2. in the project directory, you must create two volumes:
    docker volume create postgres-data
    docker volume create pg-admin

3. if on windows or a pre-silicon mac:
    docker compose build
    on mac m1 or newer: DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build

4. docker compose up (if fastapi-1 container is not running at first, you should just need to restart it. theres an intermittent issue where that container tries to start before its dependencies are loaded)

to interact with the database:
i am not sure if when i set the server up, whether or not pg admin saves my data. you can check by visiting: http://localhost:8082/browser/


login

NOTE: enter everything exactly as its written here, otherwise it wont work.

email: admin@admin.com
password: admin

if there are no servers on the left side, and no graphs on the right, youll need to make your own.
you can follow the instructions on the learn page (they have pictures) starting about halfway down at the header called "Register a Server" https://learn-2.galvanize.com/cohorts/3741/blocks/1897/content_files/build/01-sql-II/71-module-project.md

Name: (i used "LifeLink Database")

hostname: postgres
port: 5432
maintenance database: postgres
username: admin
password: admin


that is the skeleton of the database, the rest is getting the actual data in there and playing with it.


## 2
the last couple days have been spent working on Posts backend, mostly debugging. a big mistake i made without knowing, was we were executing the database queries in a copy called postgres, and nothing was working. after that was straightened out, things started moving a lot more quickly.

## 3
this morning, i finished the posts/mine backend api endpoint. this function uses the same logic as the "get_users_posts" that will serve as a the back end for the "profile" page in the browser later on. the difference is that it will automatically get the account data from the logged in user, and

## journal entries lost in the wind
will come back for these

## x
today was a big day for production. we got a lot of the frontend issues taken care of, including the navbars "isAuthenticated" functionality, which basically shows a different set of nav options if a user is logged in vs if theyre not. once that was done, i was able fix a problem in the home page that proved rather challenging. the issue was that we werent able to make new posts, because there was no user to assign it to. i traced through the problem, and realized we needed a token in the request header for it to take. to do this, i made a simple little fetchToken function, but was surprised to find out it returned null, as opposed to the 400 character token we were looking for. one of the seirs, thomas, was able to see the issue immediately, i needed to configure the fetch and include the credentials. to my knowledge, this is just one of reacts many little quirks. its ommitted by default, and when i want the token data, i need to manually include it. ill never forget now!



i was also able to make the homepage show differently when the user is logged in, using a ternary style operator logic identical to the one i mentioned above for the navbar. now, the home page for a new (non authenticated) user is a dummy page, with intriguing false posts designed to make you want to interact. when you do interact, youre redirected to the signup page. cool!

notes from today:
!!!!!!!!!!!  if NOT data! FFS!!!!!!!!!!!!!!!!

```javascript
const fetchConfig = {credentials: 'include'};
```
token *is* in credentials,
omitted by default, need to ask nicely to see
s


changes today 2/1/24
created migration files,
recreated server in pg admin
recreate volumes=
change database_url_from_env_file to database_url (to match everything else, including __main__.py in api/migrations)

fixed migrations, you need a nested list inside steps= for a migration file with a comma at the end for python sql injection to work. i had to completely recreate the project from a docker and pgadmin perspective.


# y
today, i worked on the my_profile frontend page. it was a challenge, as there are a lot of little features and embedded functionality. from your profile page, you can now:
1. update profile, which will redirect you to a form.
2. delete profile, where youll be prompted with a model, reminding you that deletion is permanent and will also delete all associated posts. if you confirm, youll be redirected to the welcome page.
3. update post, which brings you to another form, but with the post content pre loaded in the input box.
4. delete post, which deletes an individual post, and rerenders the page to reflect the changes.
5. create and submit a new post
6. view your existing profile information

to implement the update post functionality, i had to create a 'get specific post' backend endpoint, which we didn't originally need. now that we have it, we are able to grab the content to preload the input box. that makes the user experience more efficient, because you can see the string you want to change in front of you. it would have been clunky to have the user just try to remember what was wrong. a stretch goal regarding this feature may be to implement inline editing, similar to slack, so the users attention isnt redirected to an entirely separate page.

development note:
i learned today that in fastAPI, you can't have multiple identical paths that utilize the same method, for different purposes. python language being opinionated and defaulting to the first of the two identical paths caused a major headache for me today. the solution here was to make the route for get specific post unique, after that it was relatively smooth sailing.

todos:
still want to figure out the datetime functionality that tracks how much time has passed since the post was submitted. the logic is different in update post vs my profile. also like to move the buttons on my profile up off the input box a couple pixels. 
