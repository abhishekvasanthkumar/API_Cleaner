API_Cleaner

An API Cleaner created with Node and ExpressJS. This project was built while completing a take home coding assignment in Node. The project is been deployed on Heroku.

Dependencies:
Express
Body Parser

Setup and Usage:
git clone https://github.com/abhishekvasanthkumar/API_Cleaner.git

Install the dependencies using npm package manager

npm install

In terminal type

npm start

Open browser on url

localhost:4800/

Routes:
Available Vehicle IDs: 1234, 1235

Route('/vehicles/:id') | HTTP Verb(GET) | Description(Get all details of the vehicle 'id')

Route('/vehicles/:id/doors') | HTTP Verb(GET) | Description(Get security details of vehicle 'id' with respect to doors locked or not)

Route('/vehicles/:id/fuel') | HTTP Verb(GET) | Description(Get details of vehicle 'id' Fuel Range)

Route('/vehicles/:id/battery') | HTTP Verb(GET) | Description(Get details of vehicle 'id' Battery Range)

Route('/vehicles/:id/engine') | HTTP Verb(POST) | Description(Change status of the vehicle 'id'.)

