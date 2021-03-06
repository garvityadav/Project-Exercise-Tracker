require("dotenv").config();
// const port = process.env['PORT']
// const url = process.env['MONGO_URI']
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require('./routes/router');
const url = process.env.MONGO_URI;
const port = process.env.PORT;
const connectDB = require('./database/index');
const noRoutes = require("./middleware/no-routes");
const errorhandler = require("./middleware/error-handler");
//middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.use('/api/users',routes)
app.use('/',errorhandler)
app.use(noRoutes);
/*I wanted to connect my database first 
and then the server*/
const start= async ()=>{
  try{
    await connectDB(url);
    app.listen(process.env.PORT || 3000,
      console.log(`Your app is listening on port:${port}...`)
      );
    }catch(err){
      console.log(err);
    }
  
}

start();