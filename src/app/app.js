const express = require('express');
const path = require();
const bodyParser = require();
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./user');
const user = require('./user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const mongodbURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/todos';

connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(() => {
    console.log('Connection to MongoDB server established');
  }).catch(() => {
    console.log('Unnable to connect to MongoDB server');
  });

app.get('/',(req, res) => {

});

app.post('/register',(req, res) => {
    const {username, password} = req.body;
    const user = new User({username, password});

    user.save(err => {
        if(err) {
            res.status(500).send('ERROR, coulndt make the user registration!');
        }
        else {
            res.status(200).send('User registered succesfully!');
        }
    });
});

app.post('/authenticate',(req, res) => {
    const {username, password} = req.body;
    
    User.findOne({username}, (err, same) => {
        if(err) {
            res.status(500).send('ERROR, coulndt authenticate the user!');
        } else if (!user) {
            res.status(500).send('ERROR, coulndt find the user!');
        }
        else {
            user.isCorrectPassword(password, (err, result) => {
                if (err) {
                    res.status(500).send('ERROR, coulndt authenticate the user!');
                } else if (result) {
                    res.status(200).send('User authenticate succesfully!');
                } else {
                    res.status(500).send('ERROR, incorrect password!');
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log(`Server is working`);
});

module.exports = app;