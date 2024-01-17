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
