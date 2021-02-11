const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
let user = require('../Models/user.model');

router.route('/add').post(function (req,res) {
    console.log("Add method1");
    let user1 = new user(req.body);
    console.log("user1"+user1);
    user1.save()
        .then(user=>{
            res.status(200).json({'user':'successful'});
        }).catch(err=>{
        res.status(400).send('fail');
    });
});

router.get("/validateUsers/:email/:password",function (req,res) {
    let email = req.params.email;
    let password = req.params.password;
    console.log("name:"+email);
    console.log("password:"+password);

    user.findOne({ email: email, password: password },)
        .exec()
        .then(email =>{
            if( email === null ){
                console.log(email);
                res.status(200).json({"Message": "not found"});
            }else{
                res.status(200).json({"Message": email});

            }
        }).catch(err=>{
        res.status(500).json(err);
    })
});

module.exports = router;