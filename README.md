##rest-api-to-fetch-url-html-content

##Details

There are 2 end points:

1. /main: Data should be posted to this endpoint. It expects a json object with a url property that contains the url for which HTML should be fetched. It returns a job id.

2. /job/id: This endpoint can be used to fetch information about job. It is a GET endpoint and expects the job id in the url. e.g. http://localhost:8000/job/87 (87 is the job id you got as response when you created a job with POST request to /main).

##Assumptions

To protect the routes I have used a middleware with just one token. And both the endpoints expect a route Authorization Bearer header with this token as follows:

Authorization: Bearer 56AD94FD489CB2BE572765DA25A1D483968CF9069315A69F8A3EE12B80437DA1

With the future scope tokens can be created and stored for individual users.

##Requirements - Redis and MongoDB

I have used Kue npm module to create the job queue. To run this one will need a redis server instance running as Kue is backed by redis. I have used mongodb for this project so also a running mongodb instance will be needed. 

##HOW TO

1. npm install
2. node server.js

Server is running on localhost:8000 so to call the endpoints do localhost:8000/main

