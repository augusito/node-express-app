# Node express app

A backend Node.js app using [Express 4](http://expressjs.com/).

### Authentication

1. JWT (username and password)
	- The user is prompted to provide username and password which are submitted to the backend.
	- The backed validates the submitted credentials.
	- If the credentials are valid, the user is logged in and a signed token is created and returned in response, otherwise appropriate error messages are returned.
	- The client saves the token locally (in this case AsyncStorage) and sends it back in every subsequent request that needs authentication.
	- All requests needing authentication pass though a middleware that checks the provided token and allows the request only if the token is valid
	
2. OAuth (service provider)
	- The user is prompted to login using a service provider (facebook or google).
	- The client receives OAuth token from the service provider after user gives authorization.
	- The client passes the obtained OAuth token to the backend
	- The backend sends OAuth token to the service provider to validate the  received OAuth token. 
	- The service provide responds to backend with username/email information
	- The username/email obtained is used to create an account.
	- The backend creates a signed token for the created account and return it in response to the client. 
	- The client saves the token locally (in this case AsyncStorage) and sends it back in every subsequent request that needs authentication.
	- All requests needing authentication pass though a middleware that checks the provided token and allows the request only if the token is valid
	
### The end points
Base URL: https://node-express-244.herokuapp.com/

#### GET /

Request:

```bash
$ http GET https://node-express-244.herokuapp.com/
```

Response:

```bash
Welcome to Node Express App!
```

POST /auth/login

Request:

```bash
$ http POST https://node-express-244.herokuapp.com/auth/login

body: {
    "email": "test@gmail.com",
    "password": "123"
}
```

Sample Response – Success

```bash
{
    "body": {
        "id": 1,
        "email": "test@gmail.com",
        "username": "test"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTU3MzAyMDYyNX0.my6dacpY8damH0hwY1PA8kivbSEt0G9MfZIoNfZUhjA"
}

```
Sample Response – Error

```bash
{
    "errors": [
        {
            "msg": "Email field is required",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password field is required",
            "param": "password",
            "location": "body"
        }
    ]
}
```

GET /users[/:id]

Request:

```bash
$ http GET https://node-express-244.herokuapp.com/users

headers: 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTU3MzAyMDYyNX0.my6dacpY8damH0hwY1PA8kivbSEt0G9MfZIoNfZUhjA
```

Sample Response – Success

```bash
{
    "users": [
        {
            "id": 1,
            "email": "test@gmail.com",
            "username": "test",
            "password": "123",
            "createdAt": "2019-11-05T09:58:07.879Z",
            "updatedAt": "2019-11-05T09:58:07.879Z"
        }
    ]
}
```

Sample Response – Unauthorized

```bash
Unauthorized
```

POST /users/create

Request:

```bash
$ http POST https://node-express-244.herokuapp.com/users/create

headers: 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ0ZXN0In0sImlhdCI6MTU3MzAyMDYyNX0.my6dacpY8damH0hwY1PA8kivbSEt0G9MfZIoNfZUhjA

body: {
    "email": "test1@gmail.com",
    "username": "test1",
    "password": "123456"
}
```

Sample Response – Success

```bash
{
    "id": 2,
    "email": "test1@gmail.com",
    "username": "test1",
    "password": "123456",
    "updatedAt": "2019-11-06T06:36:35.257Z",
    "createdAt": "2019-11-06T06:36:35.257Z"
}

```
Sample Response – Error

```bash
{
    "errors": [
        {
            "msg": "Email field is required",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Username field is required",
            "param": "username",
            "location": "body"
        },
        {
            "msg": "Password field is required",
            "param": "password",
            "location": "body"
        }
    ]
}
```

