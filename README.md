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