const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 4000;
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://admin:admin@cluster98.3xw4f.mongodb.net/AFFinalExam?retryWrites=true&w=majority",{useNewUrlParser: true})
const connection = mongoose.connection;

connection.once('open', function () {
    console.log('mongoDB database connection established successfully')
});

//Start the server using express
app.listen(PORT, function () {
    console.log("Server is running on PORT:" + PORT);
});

//Make route instance from express
const userRoute = require('./Routes/user.route');
const vegetableRoute = require('./Routes/vegetable.route');

//create URL and add router
app.use('/api/user',userRoute);
app.use('/api/vegetable',vegetableRoute);

