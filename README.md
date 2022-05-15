## [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

This was the project I made for the [FreeCodeCamp's](https://www.freecodecamp.org) backend certificate.


### What this project do?
  This API can track your activity you entered in the exercise block and return a json object of the activities you entered.
  You can also return the activities/exercise you perform in a time period(range).
  
  [Temporary website.](https://Project-Exercise-Tracker.garvityadav07.repl.co) 

### To run the project 
  1) Clone the repo.
  2) Hit ```npm i``` in the console.
  3) Create a new .env file in the main directory and add the fields which are there in sample.env.
  4) Start the project by writing ```npm start```.
  5) Head over to http://localhost:[port]/ to see the homepage


### Things you can do
  1. Create a new user 
  2. Head over to /api/users to view all the users which are there in the db
  3. Head over to /api/users/:id/logs to view all the logs of the users.
  4. You can add activities in the activity form
  5. You can go to /api/users/:id/logs?from=2021&to=2022&limit=3 , where ```from``` is the starting date from where you will see the activities , ```to``` is the date till which you can see your activities and ```limit``` are the number of activities on a single page.


#### Created 
  Created on 08 MAR 2022
  Current update-> 15 MAY 2022