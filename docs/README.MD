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
