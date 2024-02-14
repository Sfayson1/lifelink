# Project Documentation

## API
FastAPI - Swagger is a Python web framework used for building APIs. The sections to notice when using swagger are:

- Request body
- Responses
  - Server response
  - Responses

#### Request body
Request body is where you will input the data that you want to be processed

#### Responses
Responses is where you will get the response to the data you just inputted. Two sections to pay attention to are:

- Server response: this is the live response from server with the data you inputted
- Responses: this shows the possible responses and associated codes

#### Response meanings

200: Successful Response<br>
The endpoing functioned properly with the input supplied

422: Validation Error<br>
The request cannot be fulfilled due to incorrect input

500: Internal Server Error<br>
The server encountered an unexpected condition that prevented it from fulfilling the request

### Buttons

Buttons that are commonly used are:

- Try it out: allows access to inputting data<br>
![Img](/docs/pics/buttons/try%20it%20out.png)
- Execute: runs the endpoint based on the data supplied in Request body<br>
![Img](/docs/pics/buttons/execute.png)
- Reset: returns the Request body to default position<br>
![Img](/docs/pics/buttons/reset.png)

## Instructions key
Function: description of function.

Image of the swagger screenshot.

Request body: <br>
input to be inserted into the Request body text box.

Image of the swagger screenshot after execute is clicked.


## Endpoint Tags

### <u>Auth: affects user functionality.</u>

#### <u>Create User: used to create a user.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Create%20user%20before.png)

Request body:<br>
{<br>
  "username": "string",<br>
  "first_name": "string",<br>
  "last_name": "string",<br>
  "password": "string",<br>
  "email": "string",<br>
  "grad_class": "string"<br>
}

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Create%20user%20after.png)

#### <u>Get User: used to get a user.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Get%20User%20before.png)

Request body: id of user you want to see

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Get%20User%20after.png)

#### <u>Get All: used to get all user information.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Get%20All%20Users%20before.png)

Request body: N/A

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Get%20All%20Users%20after.png)

#### <u>Update User: used to update user information.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Update%20User%20before.png)

Request body:<br>
{<br>
  "first_name": "string",<br>
  "last_name": "string",<br>
  "email": "string",<br>
  "grad_class": "string"<br>
}

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Update%20User%20after.png)

#### <u>Delete User: Delete a user and all posts associated with that user.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Delete%20user%20before.png)

Request body:<br>
id of user you want to delete

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Delete%20user%20after.png)

#### <u>Login: login a user.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Login%20before.png)

Request body:<br>
username: enter username<br>
password: enter password

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Login%20after.png)

#### <u>Logout: logout a user.</u>

![Img](/docs/pics/Logout.png)

Request body: N/A

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Logout%20after.png)

#### <u>Get Token: check if a user is logged in.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Get%20Token%20before.png)

Request body: N/A

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Get%20Token%20after.png)

### <u> Posts: affects post functionality </u>

#### <u>Create Post: used to create a post.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Create%20post%20before.png)

Request body:<br>
{<br>
  "content": "string",<br>
  "date_posted": "2024-02-09"<br>
}

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Create%20post%20after.png)

#### <u>Get Specific Post: used to get a specific post.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Get%20specific%20post%20before.png)

Request body: <br>
id of post you want to see

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Get%20specific%20post%20after.png)

#### <u>List All Posts: used to get all posts.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20List%20all%20posts%20before.png)

Request body: N/A

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20List%20all%20posts%20after.png)

#### <u>List My Posts: used to get all posts of the logged in user.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20List%20my%20posts%20before.png)

Request body: N/A

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20List%20my%20posts%20after.png)

#### <u>List Users Posts: used to get all posts of a specific user.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20List%20User%20post%20before.png)

Request body:<br>
user_id: id of the user you want to get all posts for

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20List%20User%20post%20after.png)

#### <u>Update Post: used to update user information.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20update%20post%20before.png)

Request body:<br>
post_id: the id of the post you want to change<br>
{<br>
  "content": "string",<br>
  "date_posted": "2024-02-09"<br>
}

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20update%20post%20after.png)

#### <u>Delete Post: Delete a post.</u>

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Delete%20post%20before.png)

Request body:<br>
post_id: id of post you want to delete

![Img](/docs/pics/FastAPI%20-%20Swagger%20-%20Delete%20post%20after.png)

## Frontend

This is the LifeLink Web App. The pages are classified into different name:<br>
1. Home page before sign in
2. Log in
3. Sign up
4. Home page after sign in
5. My profile
6. List of users
7. Specific user
8. Update user

### 1. Home page before sign in
This page is the first page an unlogged in user will get to, it gives a mock home page with navigation buttons to sign up, login, as well as see who is registered.<br>
![Img](/docs/pics/Home%20before%20Sign%20in.png)

### 2. Log in
This is the log in page, from here you can enter your username and password and upon clicking Login, you will be logged in and redirected to the "Home page after sign in". Your password is automatically hidden for security purpose, but there is also the option to show your password.<br>
![Img](/docs/pics/Login.png)

### 3. Sign up
This is the sign up page, here you will enter your Username, Password, First name, Last name, Email, and Graduating Class. Like with the log in page you have the option to show you password. Once you click Sign up, you will be registered and directed to the "Home page after sign in".<br>
![Img](/docs/pics/Sign%20up.png)

### 4. Home page after sign in
Here is your Home page, this version of "after sign in" is different than "before sign in" in which you will now be able to view the posts of your other Hack Reactor graduates. On each post under "LifeLink Feed" you will be able to see their name, the date is was posted, and the contents of their post. Your navbar has also changed, no longer showing login/sign up, and now showing List of Users, My Profile, Update Profile, and Logout. Below the navbar you see a text box with "What's new?" that is where you input the text for your post. The submit button on the right processes and submits your post and updates it to the LifeLink Feed.<br>
![Img](/docs/pics/Home%20after%20Sign%20in.png)

## 5. My profile
This is your profile, it will show the information you entered upon sign up as well as filter out only the posts you have published to the Lifelink Feed. You also have the option to post to the feed from here with the same method as you do in "Home page after sign in". On the right side of the page you have the ability to delete and update your profile as well as edit and delete an individual post. If you choose to click Delete Account, you will be asked to confirm deletion of not only your account, but your posts as well. The Update Profile button will bring you to the "Update Profile" page, the edit button for editting a post will behave similarily to the update profile button.<br>
![Img](/docs/pics/My%20profile.png)

## 6. List of users
This page displays all users that are currently registered in the LifeLink Database. From here you can click on the user's name to view their specific profile.<br>
![Img](/docs/pics/List%20of%20Users%20after%20Sign%20in.png)

## 7. Specific user
Once you click on a users name (either from the "List of users" or "Home page after sign in" pages) it will bring you here. It is very much like the "My profile" page except it displays the information and posts of that specific user.<br>
![Img](/docs/pics/Get%20Specific%20User.png)

## 8. Update user
From here you can change certain parts of your profile. Username and Password are not able to be changed unfortunately. You will be able to change the First name, Last name, Email, and Graduating class from here. All fields must be filled in order for the data to be updated. You all have the option to delete your account through the Delete User button. It behaves similarily to the Delete User button in the "My Profile" page.<br>
![Img](/docs/pics/Update%20User.png)
