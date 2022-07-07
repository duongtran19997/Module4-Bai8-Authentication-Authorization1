import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";

import authRoutes from "./src/router/authRouter";

import session from "express-session";

import passport from "./src/middleware/passport";

const PORT = 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views','./src/views');
const Url = 'mongodb+srv://root:Password@cluster0.l1wd2.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(Url).then(() =>{
    console.log('DB Connection')
}).catch(err =>{
    console.log('Error connecting to MongoDB')
});
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },

}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(passport.session());

app.use("/auth", authRoutes);

// app.use(express.urlencoded({ extended: false }));

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});


