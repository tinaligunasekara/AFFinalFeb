const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
let vegetable = require('../Models/vegetable.model');

router.route('/add').post(function (req,res) {
    console.log("Add Vege");
    let vegetable1 = new vegetable(req.body);
    console.log("vegetable1"+vegetable1);
    vegetable1.save()
        .then(vegetable=>{
            res.status(200).json({'vegetable':'successful'});
        }).catch(err=>{
        res.status(400).send('fail');
    });
});

router.route('/getAllvegetables').get(function (req,res) {
    vegetable.find(function (err,vegetables) {
        if(!err){
            res.json(vegetables);
        }else{
            res.status(400).send('fail');
        }
    });
});

router.get("/getDetailsbyvegetableName/:vegetableName",function (req,res) {
    console.log("Search Vege");
    const vegetableN = req.params.vegetableName;
    vegetable.find({ vegetableName: vegetableN },)
        .exec()
        .then(veget =>{
            console.log("vegetableN");
            if( veget ){
                res.status(200).json(veget);
            }else{
                res.status(404).json({"message": "not found"});
            }
        })
        .catch(err=>{
            res.status(500).json(err);
        })
});
module.exports = router;