const express = require('express')
const bodyParser = require("express").json;


//routes
const usersRouter = require('./routes/dbroutes');

//middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());

app.use('/api/upcloud/users', usersRouter)

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

module.exports = app;
