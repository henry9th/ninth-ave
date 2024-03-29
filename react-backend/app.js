let cookieParser = require("cookie-parser");
let createError = require("http-errors");
let express = require("express");
let logger = require("morgan");
let mongoose = require("mongoose");

let conf = require("./conf");
let indexRouter = require("./routes/index");

let setupMongoDB = async () => {
  try {
    mongoose.set("useFindAnyModify", false);
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(conf.mongodb, {
      useNewUrlParser: true
    });
    console.log("connection state: " + mongoose.connection.readyState);    

    console.log(`MongoDB connected: ${conf.mongodb}`);
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
};

setupMongoDB();

let app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // TODO: Remove later

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH');
 
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

app.use("/", indexRouter);


app.all("*", (req, res) => {
  res.status(404).send({ error: "Bad request" });
});

module.exports = app;
