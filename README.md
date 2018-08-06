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

Route                       HTTP Verb           Description
/vehicles/:id               GET                 Get all details of the vehicle 'id' (vin, color, doorCount, driveTrain)
/vehicles/:id/doors         GET                 Get security details of vehicle 'id' with respect to doors locked or not
/vehicles/:id/fuel          GET                 Get details of vehicle 'id' Fuel Range
/vehicles/:id/battery       GET                 Get details of vehicle 'id' Battery Range
/vehicles/:id/engine        POST                Success/Error on Start/Stop Engine of vehicle 'id'.
