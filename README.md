# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the root project directory, you can run:

### `npm run app`

To start client

### `npm run api`

To start server

## Notes

Also need to add a .env file to the `api` directory, where specify these variables:

### `API_PORT`: 9090

### `CLIENT_URL`: http://localhost:3000

### `MONGO_URI`

### `JWT_SECRET`: mysecrettoken

Also if you are using `VSC`, then make in the root of the project, where `api` & `app` folder `.vscode` or add the `settings.json` file there, where insert this parameter:

### `"eslint.workingDirectories": ["app/", "api/"]`
