var classLoader = require("../Services/ClassLoader");
var express = require("express");
var router = express.Router();


router.get("/", (req, res, next) => {
    var musicQueue = classLoader.musicQueue;
    console.log(classLoader.isInitialized);
    console.log(musicQueue.testQueue());
    res.send("Hello from express!");
})

module.exports = router;
