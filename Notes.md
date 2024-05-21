# **Node JS notes**

## Section 1

What is Node JS ?

Node. js is a single-threaded, open-source, cross-platform runtime environment for building fast and scalable server-side and networking applications. It runs on the V8 JavaScript runtime engine, and it uses event-driven, non-blocking I/O architecture, which makes it efficient and suitable for real-time applications

## Section 2 Intro to Node JS

- How to import core node modules or your own modules, or 3rd party modules
- Reading and writing files
- Creating a Web Server
- Routing, templating
- Package versioning
- Setting up prettier

## Section 3 - Back end development

- How the web works
- HTTP in action
- Request headers
- Static vs Dynamic API

## Section 4 - How Node JS Works

- Javascript on server side to build highly scalable web applications
- Single threaded, based on event driven, non-blocking, I/O model.
- Perfect for building fast and scalable data-ontensive app.

### Use cases

API with database
Data streaming, like youtube
real-time chat app
Server-side web app

Don't use for Apps with heavy server side processing CPu intensive

## Section 5 - asynchronous javascript, Promises and async/await

- Building promises
- Consuming promises
- Returning values from async functions
- Waiting for multiple promises simultaneaously

## Section 6 - Building Natours App

- Set up Express and Basic Routing

Express contains a very robust set of features: complex routing, easier handling of requests and responses, middleware, server side rendering etc

Express allows for rapid development of Node js apps.
Express makes it easier to organise our app into the MVC architecture.

`npm i express`

Then in the app.js:

```
  const express = require('express')

  app.get('/', (req, res) => {
    res.status(200).send('Hello from the server side!)
  })

  const app = express()

  const port = 3000
  app.listen(port, () => {
    console.log(`App running on port ${port}...`)
  })

```

At this point you could test this by running
`nodemon app.js`

And you should see the message in terminal

And you can start testing this in Postman
Just add GET request to 127.0.0.1:3000 and hit send

Now instead of sending a string to client, you could send json.

So change it to:

```
  const express = require('express')

  app.get('/', (req, res) => {
    res
    .status(200).
    .json({ message: 'Hello from server side!', app: 'Natours'})
  })

  const app = express()

  const port = 3000
  app.listen(port, () => {
    console.log(`App running on port ${port}...`)
  })

```

So now you get back json response in Postman!

- Install Postman
  getpostman.com and install the app

- APIs and RESTful API Design
- GET, POST , PATCH, DELETE requests
- Middleware
- Env variables

## Section 7 - Intro to Mongo DB

## Section 8 - Using Mongo DB with Mongoose
