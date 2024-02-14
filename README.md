# LifeLink


<a name="readme-top"></a>


[![Pipeline Status](https://img.shields.io/gitlab/pipeline-status/purveyors-of-progress/life-link-project-gamma?label=Pipeline&labelColor=blue&logo=gitlab)](https://gitlab.com/purveyors-of-progress/life-link-project-gamma/-/pipelines)
[![Last Commit](https://img.shields.io/gitlab/last-commit/purveyors-of-progress/life-link-project-gamma?label=Last%20Commit&labelColor=blue&logo=gitlab)](https://gitlab.com/purveyors-of-progress/life-link-project-gamma)
[![Merge Requests](https://img.shields.io/badge/Merge%20Requests-Check%20Here-blue)](https://gitlab.com/purveyors-of-progress/life-link-project-gamma/-/merge_requests)
[![Forks](https://img.shields.io/gitlab/forks/purveyors-of-progress/life-link-project-gamma)](https://gitlab.com/purveyors-of-progress/life-link-project-gamma/-/forks)
[![Stars](https://img.shields.io/gitlab/stars/purveyors-of-progress/life-link-project-gamma)](https://gitlab.com/purveyors-of-progress/life-link-project-gamma/-/starrers)
[![Open Issues](https://img.shields.io/gitlab/issues/open/purveyors-of-progress/life-link-project-gamma?label=Open%20Issues&labelColor=blue&logo=gitlab)](https://gitlab.com/purveyors-of-progress/life-link-project-gamma/-/issues)

[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://gitlab.com/purveyors-of-progress/life-link-project-gamma">
    <img src="./docs/pics/Screen Shot 2024-02-09 at 12.46.50 PM.png" alt="Logo" >
  </a>

<h3 align="center">LifeLink</h3>

  <p align="center">
    This project is aimed at creating an open-source communication platform for alumni members of the Hack Reactor Advanced Immersive Software Engineering Program. <br> <br><i>Share a link to your project, on our project</i>
    <br /><br>
    <a href="./docs/README.MD"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://life-link-project-gamma-purveyors-of-progress-cbd3ad7e97f6d732f.gitlab.io/">View Demo</a>
    ·
    <a href="https://gitlab.com/purveyors-of-progress/life-link-project-gamma/-/issues">Report Bug</a>
    ·
    <a href="https://gitlab.com/purveyors-of-progress/life-link-project-gamma/-/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#functionality">Functionality</a></li>
        <li><a href="#goals-for-the-project">Goals for the project</a></li>
        <li><a href="#unit-testing">Unit tests</a></li>
        <li><a href="#local-setup">Local Setup</a></li>
        <li><a href="#get-it-running">Get it Running!</a></li>
        <li><a href="#configure-the-database">Configure the Database</a></li>
        <li><a href="#navigation">Navigation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This project showcases our abilities in full life-cycle software development. From just an idea, all the way to a deployed, functioning full stack web application. We created a design, underwent a thorough planning process, and executed each step sequentially until it was done.

## Functionality
- Before login, you are intially directed to a "welcome" page, where you're able to view a sample set of posts, which are static and placed ironically as a hook to grab the potential users attention.<br>
<br>
- As a non-logged in user, you have the ability to see all other users, and their respective posts.<br>
<br>
- As a logged in user, you will have accessibility to four main pages, the homepage, list of users, my profile, and update user.
    - Home page will allow you to view the most current posts within the LifeLink Feed as well as publish your own posts.
    - Within list of users, you'll be able to view a list of currently registered users as well as view their individual profile.
    - The my profile page will allow you to Update or delete either your profile or your posts.

## Goals for the project
This project was developed from start to finish within a 4 week time-frame. Our product is in its first production version, which is a living solution to the problem of struggling to keep up with who's who on linkedin, and what graduating class they're from, mixed in with the ever-evolving other details of their lives. As Hack Reactor students, we are focused on one thing, *networking.* We want to know who, from what class, did what to get what interview or what job, and share helpful insights as they see fit.
<br>
<br>
We have hopes to continue forward on this journey, improving the app experience as our skillset grows.<br>
<br>
Our goals for this project are as follows:

1. Links shared in a post made to be clickable. This will facilitate a good user experience when other students are sharing their projects.
2. Ability to post photos/implement profile photos.
3. Individual chatrooms which are category-specific. For example, a 'jobs board' could be an independant feed where we talk about employment opportunities, tips, etc.

## Unit testing:
- ***test_post.py*** completed by Zack Hitchcock. tests 'get_specific_post' query
- ***test_posts.py*** completed by Sherika Fayson. tests 'get_all_posts' query
- ***test_users.py*** completed by James Bratcher tests 'get_all_users' query

### Built With

* [![Fast][fastapi]][fastapi-url]
* [![React][React.js]][React-url]
* [![Vite][vite.js]][Vite-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* ![Postgresql][postgresql-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
*Our project is deployed! you can visit the production version here:* **[LifeLink](https://life-link-project-gamma-purveyors-of-progress-cbd3ad7e97f6d732f.gitlab.io/)**

### Local Setup

1. fork & clone this project:



### Get it running

1. in your terminal, cd to this projects directory.
2. Install python dependencies locally

In order for VSCode's built in code completion and intelligence to
work correctly, it needs the dependencies from the requirements.txt file
installed. We do this inside docker, but not in the workspace.

So we need to create a virtual environment and pip install the requirements.

'cd' to the `api` folder and execute these commands:

```bash
python -m venv .venv
```

Then activate the virtual environment

```bash
source ./.venv/bin/activate
```

Upgrade pip

```bash
python -m pip install --upgrade pip
```

And finally install the dependencies

```bash
pip install -r requirements.txt
```

Now open the project in VSCode
```bash
code .
```

Then make sure the venv is selected in VSCode by checking the lower right of the
VSCode status bar

4. in VSCode, create a `.env` file in the root directory and enter the following:<br>
*note: signing keys are unique. below is a sample for your convenience*<br>
```bash
DATABASE_URL=postgresql://admin:admin@postgres:5432/postgres-data
SIGNING_KEY_FROM_ENV_FILE=oi4j7f-oijoisjfeihf1iu1-rdghlijwelihf
VITE_API_HOST=http://localhost:8000
```
5. in VSCode, in a file: ghi/src/main.jsx,
youll need to comment out lines 8&9, and uncomment line #10. This will leave the code in good condition to run in the docker environment.<br>
![main](./docs/pics/mainjsx.png)
5. Now, open docker desktop
6. back in your terminal, in the root directory, enter these commands:
```bash
docker compose build
# IF RUNNING ON A MAC WITH SILICON PROCESSOR:
DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build
```
```bash
docker compose up
```
7. in docker desktop: ensure you have the following volumes: <br>
![](./docs/pics/Screen%20Shot%202024-02-09%20at%2013.16.09%20PM.png)


### Configure the database:
1. [click here to open pgadmin](http://localhost:8082/browser)
2. enter the credentials:
    - Email: 'admin@admin.com'
    - Password: 'admin'
3. right click ***'servers'***
4. select ***'register'***
5. select ***'server'***
6. name the database (name can be anything)
7. select ***'connection'*** tab
8. enter ***'postgres'*** for hostname
9. enter ***'admin'*** for password
10. select ***'save'*** on the bottom right of the popup window

11. if the fast API container doesnt start running automatically, you will just need to start it manually. migrations run automatically for this project upon container startup, but we all know docker. It might need some manual persuasion.



***At this point, you are running the local version of our project!***

## Navigation

To navigate the local application, you will need the following endpoints saved:
1. backend API: http://localhost:8000/docs#/
2. frontend navigation: (Start here) http://localhost:5173/welcome
    - documentation for the frontend web page can be viewed here: [click me](./docs/README.MD)
3. pgadmin database: http://localhost:8082/browser





<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Here, you will find all API documentation, and examples of the projects frontend as it functions at the time of writing this readme.

_For more examples, please refer to the [Documentation](./docs/README.MD)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Added an AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Merge Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

<p align="center">
  <a href="https://www.linkedin.com/in/zack-hitchcock-17841a219">
    <img src="./docs/pics/zack.png" width="200" height="200">
  </a><br>
  <a href="https://www.linkedin.com/in/zack-hitchcock-17841a219">Zack Hitchcock - LinkedIn</a><br>
  <a href="mailto:hitchcockzack@gmail.com">hitchcockzack@gmail.com</a>
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/james-kenji-bratcher/">
    <img src="./docs/pics/james.png" width="200" height="200">
  </a><br>
  <a href="https://www.linkedin.com/in/james-kenji-bratcher/">James Bratcher - LinkedIn</a>
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/sherika-fayson/">
    <img src="./docs/pics/sherika.png" width="200" height="200">
  </a><br>
  <a href="https://www.linkedin.com/in/sherika-fayson/">Sherika Fayson - LinkedIn</a>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: www.linkedin.com/in/zack-hitchcock-17841a219/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Vite-url]: https://vitejs.dev/
[vite.js]: https://img.shields.io/badge/vite-js-000000?style=for-the-badge&logo=vite&logoColor=white
[fastapi]: https://img.shields.io/badge/fastapi-000000?style=for-the-badge&logo=fastapi&logoColor=white
[fastapi-url]: https://fastapi.tiangolo.com/
[postgresql]: https://www.postgresql.org/
[postgresql-url]: https://img.shields.io/badge/postgres-000000?style=for-the-badge&logo=postgresql&logoColor=white
