const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// const uri = "mongodb+srv://chenhaibin:chb20040728@restful-api.9cbsi.mongodb.net/?retryWrites=true&w=majority&appName=restful-api";

// 引入users.js
const users = require('./routes/api/users');
// 引入profiles.js
const profiles = require('./routes/api/profiles');

// Db config
const db = require('./config/keys').mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connect to mongodb
mongoose.connect(db).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));


// passport初始化
app.use(passport.initialize());

require('./config/passport')(passport);

// 使用routes
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})