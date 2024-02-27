const express = require("express");
const server = express();
const mongoose = require("mongoose");
const childRoute = require("./Route/childRoute");
const teacherRoute = require("./Route/teacherRoute");
const classRoute = require("./Route/classRoute");
const loginRoute = require("./Route/loginRoute.js");
const { authorize } = require("./Controllers/loginController.js");
const multer = require("multer");// parse to  imges
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
require('dotenv').config();

const uri = 'mongodb://localhost:27017/nodeJsProject';

//================================
// server.use(express.json(),
//     express.urlencoded({ extended: false }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
//================================


//============= connection DB =========================
mongoose.connect(uri)
    .then(() => {
        console.log("DB connected .... ");
        server.listen(port, () => {
            console.log("I am listening.........", port);
        });
    })
    .catch((error) => {
        console.log("DB connection Problem " + error);
    })
server.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', "*");
    response.header('Access-Control-Allow-Methods', "GET, POST, DELETE, UPDATE");
    response.header('Access-Control-Allow-Headers', "Content-Type, Authorization");
    next();
});
//=============upload imges====================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(path.join(__dirname, "images"));
        cb(null, path.join(__dirname, "images"))
    }
    , filename: (req, file, cb) => {
        console.log(new Date().toLocaleDateString().replace("/\//g", "-") + "-" + file.originalname);
        cb(null, new Date().toLocaleDateString().replace(/\//g, "-") + "-" + file.originalname)
    }
})
const filterFile = (req, file, cb) => {

    if (file.mimetype == "image/jpeg" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/png"
    ) {
        cb(null, true);

    } else {
        cb(null, false);

    }

}

server.use("/images", express.static(path.join(__dirname, "images")));
server.use(multer({ storage, filterFile }).single("Image"));



// authentication 
server.use(loginRoute);
server.use(teacherRoute);
server.use(childRoute);



//=============  Not found page =========================

server.use((request, response, next) => {
    response.status(404).json({ Message: "not found page" });
})

//============= Error  middleware =========================

server.use((error, request, response, next) => {
    response.status(error.status || 500).json({ message: error + "" });
})