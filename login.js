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

const bodyP = require('body-parser');
const {
    Router
} = require('express');
app.use(bodyP.json());

// Create Model for Employye collection
let employee = new mongoose.Schema({
    name: String,
    company: String
})

// Database connection 
mongoose.connect("mongodb://localhost:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connection Succesfull")).catch((err) => console.log(err));



let Data = new mongoose.model("Data", employee);

// post request


app.post("/insert", (req, res) => {
    let data = req.body;
    let employeeName = data.name;
    let companyName = data.company;

    let updateName = data.update;
    let updateField = data.updateField;

    // All field is filled so match userid and password
    console.log(employeeName);
    console.log(companyName);

    // Insert data in Database

    const insertData = async () => {
        try {
            let newdata1 = new Data({
                name: employeeName,
                company: companyName
            });
            let result =await newdata1.save();
            console.log(result)

        } catch (err) {
            console.log(err)
        }
    }
    insertData();
    res.send(`Data Inserted ${employeeName} `);
    res.status(200);

})

// Updateding API Request

app.post("/update", (req, res) => {
    let data = req.body;
    let updateName = data.update;
    let updateField = data.updateField;

    let updateData = async () => {
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

    updateData();
    res.send(`Data Updated of ${updateName} `);
    res.status(200);
})


// Creating API  Request
app.post("/read", (req, res) => {
    let finalData = async () => {
        try {
            console.log("Final Data is :")
            const result = await Data.find();
            console.log(result);

        } catch (err) {
            console.log(err)
        }
    }

    finalData();
    res.send(`Data read Succesfully`);
    res.status(200);

})



// deleting API Request
app.post("/delete", (req, res) => {
    let data = req.body;
    let deleteName = data.delete;

    let deleteData = async () => {
        try {
            const DeleteResult = await Data.deleteMany({
                name: deleteName
            })
            console.log(DeleteResult)
        } catch (err) {
            console.log(err)
        }
    }
    deleteData();
    res.send(`Data Deleted of ${deleteName} `);
    res.status(200);
})

// ḷistening server
app.listen(port, (err) => {
    if (err) throw err;
    console.log("Server Connected");
})