// import dotenv library

const dotenv = require('dotenv')
dotenv.config();
// import mongoose
const mongoose = require('mongoose')

// import express module
const express = require('express');
const app = express();

// get port from .env

const port = process.env.PORT;
const host = process.env.HOST;

// parsing data 

const bodyP = require('body-parser')
app.use(bodyP.json());

// Create Model for Employye collection
var employee = new mongoose.Schema({
    name: String,
    company: String
})

// post request
app.post("/login", (req, res) => {
    var data = req.body;
    var userKey = ['name', 'company' , 'delete' , 'update' , 'updateField'];
    var keys = Object.keys(data);
    var missingKey = new Array();
    var employeeName = data.name;
    var companyName = data.company;
    var deleteName = data.delete;
    var updateName = data.update;
    var updateField = data.updateField;

    // All field is filled so match userid and password
    if (userKey.length == keys.length) {

        console.log(employeeName);
        console.log(companyName);

        res.send(`Data Inserted ${employeeName} and Delete ${deleteName} and updated ${updateName} `);
        res.status(200)

        // checking missing field

    } else {
        for (var i = 0; i < userKey.length; i++) {
            var counter = 0;
            for (var j = 0; j < keys.length; j++) {
                if (userKey[i] == keys[j]) {
                    counter++;
                }
            }
            if (counter == 0) {
                missingKey.push(userKey[i]);
            }
        }
        var responseJSON = {
            "messages": "Required Fields Missing",
            "data": missingKey,
            "status": "‘Required Param Missing"
        }
        console.log(responseJSON);
        res.status(420)
        res.json(responseJSON);
    }

    // Database connection 
    mongoose.connect("mongodb://localhost:27017/employee", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Connection Succesfull")).catch((err) => console.log(err));

   

    var Data = new mongoose.model("Data", employee);

    // Insert data in Database

    const insertData = async () => {
        try {
            var newdata1 = new Data({
                name: employeeName,
                company: companyName
            })


            var result = await Data.insertMany([newdata1]);

            console.log(result)

        } catch (err) {
            console.log(err)
        }


    }



    // get Data from DB
    var getData = async () => {
        try {
            const result = await Data.find();
            console.log(result);

        } catch (err) {
            console.log(err)
        }



    }


    // Updateding Data
    var updateData = async () => {
        try {
            const updateResult = await Data.updateOne({
                name: updateName
            }, {
                $set: {
                    company: updateField
                }
            });
            console.log(updateResult);

        } catch (err) {
            console.log(err)
        }
    }


    // deleting Data

    var deleteData = async () => {
        try {
            const DeleteResult = await Data.deleteOne({
                name: deleteName
            })
            console.log(DeleteResult)
        } catch (err) {
            console.log(err)
        }
    }


    // final Data 

    var finalData = async () => {
        try {
            console.log("Final Data is :")
            const result = await Data.find();
            console.log(result);

        } catch (err) {
            console.log(err)
        }

    }

    insertData();
    getData();
    updateData();
    deleteData();
    finalData();

})

// ḷistening server
app.listen(port, (err) => {
    if (err) throw err;
    console.log("Server Connected");
})