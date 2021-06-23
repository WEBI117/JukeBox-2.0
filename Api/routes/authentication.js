var express = require('express');
var router = express.Router();
var path = require('path');
var Constants = require('../constants')
// Local variables
var spotifyDetailsFilePath = Constants.spotifyDetailsFilePath;
var  spotifyDetailsDict = {}

router.get('/', function(req, res, next) {
    readClientIDandSecret(spotifyDetailsFilePath)
    .then((result) => {
        spotifyDetailsDict = parseSpotifyDetailsString(result);
        console.log(spotifyDetailsDict)
        res.send("Hello from authentication.");
    })
    .catch((err) => {
        console.log(err);
        res.send("Error in reading");
    })
});

router.get('/login', (req, res, next) => {
    res.redirect()
})

// Helper functions

// Reads Client ID and Secret from textfile and stores it in local variables.
var readClientIDandSecret = (filepath) => {
    var fs = require('fs')
    return new Promise((res,rej) => {
        fs.readFile(filepath, 'utf8', (err,data) => {
            if(err){
                rej(err);
                return;
            }
            else{
                res(data);
                return;
            }
        })
    })
}
var parseSpotifyDetailsString = (inputString) => {
    var endLineSplitArray = inputString.split('\n');
    var returnDictionary = {};
    for(var x = 0; x < endLineSplitArray.length; x++){
        spaceSplitArray = endLineSplitArray[x].split(' ');
        returnDictionary[spaceSplitArray[0]] = spaceSplitArray[1];
    }
    return returnDictionary;
}

module.exports = router;
