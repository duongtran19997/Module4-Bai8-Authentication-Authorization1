
import express from "express";

const router = express.Router();

import passport from "passport";

import multer from 'multer';

const upload = multer();



router.get("/login", (req, res) => {

    // this will render login.ejs file

    res.render("login");

});



router.post('/login', upload.none(), (req: any, res, next) => {

    console.log(req.body)

    passport.authenticate("local", (err, user) => {

        if(err){

            return next(err)

        }

        if(!user){

            console.log(req.body)

            return res.send("Wrong email or password")

        }

        req.login(user,() => {

            res.send("You are authenticated")

        })

    })

});



export default router;