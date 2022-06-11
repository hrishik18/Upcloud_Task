//imports
const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require("express").json;
const cors = require("cors");
const ejsMate = require('ejs-mate');
const nodemailer = require("nodemailer");

//routes
const usersRouter = require('./routes/users');


//model
const User = require('./Models/User');
const UserVerification = require('./Models/UserVer');

//db connection
const mongoDB = 'mongodb://127.0.0.1/upcloud';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => console.log(err));
const db = mongoose.connection;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');


// nodemailer stuff
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hrishik.s@somaiya.edu",
        pass: "",
    }
})
// testing success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for messages");
        console.log(success);
    }
})

app.get('/', (req, res) => {
    res.render('register');
})

app.post('/', (req, res) => {
    const { email, uname, password } = req.body;
    const newuser = new User({
        uname,
        email,
        password,
        verified: false
    });

    newuser.save().then((result) => {
        const { _id, email } = result;
        const veriUrl = 'http://localhost:3000/user/verify/'+_id;
        console.log(veriUrl);
        // mail options
        const mailOptions = {
            from: "upcloudtask@verify.com",
            to: email,
            subject: "Verify Your Email",
            html: `<p>Verify your email address to complete the signup and login into your account.</p><p>This link
        <b>expires in 6 hours</b>.</p > <p> Press <a href="${veriUrl}"> here </a> to proceed.</p>`,
        };


        const newVerification = new UserVerification({
            userId: _id,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,
        });

        newVerification
            .save()
            .then(() => {
                transporter
                    .sendMail(mailOptions)
                    .then(() => {
                        res.send("Email send");
                    })
            }).catch((err) => {
                console.log("After saving error" + err);
            })

    }).catch((err) => {
        console.log("After saving error" + err);
    })
});

app.get("/user/verify/:userId", (req, res) => {
    console.log(req.params);
    const { userId } = req.params;
    UserVerification
        .find({ userId })
        .then((result) => {
            if (result.length > 0) {
                const { expiresAt } = result[0];
                if (expiresAt < Date.now()) {
                    UserVerification
                        .deleteOne({ userId })
                        .then(result => {
                            User.deleteOne({ _id: userId }).
                                then(() => {
                                    res.send("Link expired. Please reverify");
                                }).catch((err) => {
                                    console.log("Error in del" + err);
                                    res.send("Something went wrong!!");
                                })
                        })
                        .catch((err) => {
                            console.log("An error occurred while clearing expired user"+err);
                            res.send("An error occurred while clearing expired user");
                        })
                }else{
                    User
                        .updateOne({ _id: userId }, { verified: true })
                        .then(() => {
                            UserVerification
                                .deleteOne({ userId })
                                .then(() => {
                                    res.send("Verified")
                                  })
                                .catch(error => {
                                    console.log(error);
                                    res.send("An error occurred while finalizing successful verification.");
                                })
                        })
                        .catch(error => {
                            console.log(error);
                            res.send("An error occurred while updating user record to show verified.");
                        })
                }
            } else {
                console.log("Account record doesn't exist or has been verified already.");
                res.send("Account record doesn't exist or has been verified already.");
            }
        }).catch((err) => {
            console.log("Error in verification" + err);
        })
})

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

module.exports = app;

