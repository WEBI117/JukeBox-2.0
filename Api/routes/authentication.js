const express = require('express');
const router = express.Router();
const path = require('path');
const Constants = require('../constants')
const fetch = require('node-fetch')

// Local variables
var spotifyDetailsFilePath = Constants.spotifyDetailsFilePath;
var clientID = ""
var authorization_String = ""
var redirectURI = Constants.loginRedirectURI;

router.get('/login', function(req, res, next) {
    readClientIDandSecret(spotifyDetailsFilePath)
    .then((result) => {
        var spotifyDetailsDict = parseSpotifyDetailsString(result);
        clientID = spotifyDetailsDict['ID'];
        authorization_String = getAuthorizationString(spotifyDetailsDict['ID'],spotifyDetailsDict['Secret']);
        var URL = createSpotifyAuthCodeURL(clientID,redirectURI);
        res.redirect(URL)
    })
    .catch((err) => {
        console.log(err);
        res.send("Error in reading");
    })
});

router.get('/logincallback', (req,res,next) => {
    // Get and store refresh and access tokens then redirect to front end app.
    if(req.query.error != null){
        var errorMessage = req.query.error
    }
    else{
        var authCode = req.query.code;
        // TODO: use code to request for Access and Refresh Tokens
        var URL = createTokenRequestURL()
        var requestHeaders = createTokenRequestHeaders(authorization_String)
        var requestBody = createTokenrequestBody(authCode,redirectURI)
        fetch(URL,{
           method:"POST",
           headers: requestHeaders,
           body: requestBody
        })
        .then((resp) => {
            return resp.text();
        })
        .then((resp) => {
            var results = JSON.parse(resp);
            res.redirect(Constants.appURL)
        })
        .catch((err) => {
            console.log(err);
            res.send('Authentication failed');
        })
    }
})


// Helper functions
// ----

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

var createSpotifyAuthCodeURL = (clientid, redirectUri) => {
    var parameters = {
        "client_id":clientid,
        "response_type":"code",
        "redirect_uri":redirectUri,
        "scope":"streaming"
    }
    return createURL("https://accounts.spotify.com/authorize", parameters);
}

var createTokenRequestURL = () => {
    return "https://accounts.spotify.com/api/token" 
}

var createTokenRequestHeaders = (authorization_string) => {
    var headerObject = {
        "Authorization": authorization_string,
        "Content-Type":"application/x-www-form-urlencoded"
    }
    return createHeaders(headerObject);
}

var createTokenrequestBody = (authCode, redirect_uri) => {
    var bodyobj = {
        "grant_type":"authorization_code",
        "code":authCode,
        "redirect_uri":redirect_uri
    }
    return createBody(bodyobj);
}

var getAuthorizationString = (clientid,clientsecret) => {
    return "Basic" + ' ' + Buffer.from(clientid + ":" + clientsecret).toString("base64");
}

// Base request builder functions.
// ---
var createHeaders = (keyValuePairs) => {
    var headers = new fetch.Headers();
    var keys = Object.keys(keyValuePairs);
    for(var x = 0; x < keys.length; x++){
        headers.append(keys[x], keyValuePairs[keys[x]])
    }
    return headers;
}

var createBody = (keyValuePairs) => {
    // Create application/x-www-form-urlencoded body strings.
    var resultString = ""
    var keys = Object.keys(keyValuePairs);
    for(var x = 0; x < keys.length; x++){
        var URIEncodedKey = encodeURIComponent(keys[x]);
        var URIEncodedValue = encodeURIComponent(keyValuePairs[keys[x]]);
        var URIEncodedPair = URIEncodedKey + "=" + URIEncodedValue;
        if(x != 0){
            resultString += "&"
        }
        resultString += URIEncodedPair;
    }
    return resultString;
}

var createURL = (url, queryParams) => {
    var queryParamsString = new URLSearchParams(queryParams).toString();
    var returnURL = url;
    if(queryParamsString != ""){
        returnURL = returnURL + "?" +  queryParamsString;
    }
    return returnURL;
}
module.exports = router;
