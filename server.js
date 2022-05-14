require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require('./routes/router');
const url = process.env.MONGO_URI;
const port = process.env.PORT;
const connectDB = require('./database/index')

//middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.use('/api/users',routes)

/*I wanted to connect my database first 
and then the server*/
const start= async ()=>{
  await connectDB(url);
  app.listen(process.env.PORT || 3000,
  console.log(`Your app is listening on port:${port}...`)
  );
  
}

start();