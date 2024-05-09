const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotanv = require('dotenv');
const { colors } = require('colors');
require('colors');
const connectDb = require('./config/config');



dotanv.config();

connectDb();
const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

//routes
app.use("/api/items",require("./routes/itemRoutes"));

app.use("/api/attends",require("./routes/attendanceRoutes"));


//port
const PORT = 3001;

//listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});