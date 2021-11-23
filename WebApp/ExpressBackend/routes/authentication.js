const express = require('express');
const router = express.Router();
const path = require('path');
const Constants = require('../constants');
const fetch = require('node-fetch');
const urlHelper = require('../Helpers/UrlHelper');
const authHelper = require('../Helpers/AuthenticationHelper');
var classLoader = require("../Services/ClassLoader");

// Local variables
var spotifyDetailsFilePath = Constants.spotifyDetailsFilePath;
var clientID = ""
var authorization_String = ""
var redirectURI = Constants.loginRedirectURI;

router.get('/login', (req, res, next) => {
    authHelper.readClientIDandSecret(spotifyDetailsFilePath)
    .then((result) => {
        var spotifyDetailsDict = authHelper.parseSpotifyDetailsString(result);
        clientID = spotifyDetailsDict['ID'];
        authorization_String = authHelper.getAuthorizationString(spotifyDetailsDict['ID'],spotifyDetailsDict['Secret']);
        var URL = authHelper.createSpotifyAuthCodeURL(clientID,redirectURI);
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
        var URL = authHelper.createTokenRequestURL()
        var requestHeaders = authHelper.createTokenRequestHeaders(authorization_String)
        var requestBody = authHelper.createTokenrequestBody(authCode,redirectURI)
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
            classLoader.tokenHandler.initialize(results.refresh_token,results.access_token,results.expires_in,authorization_String);
            // Save the recieved tokens etc.
            res.redirect(Constants.appURL)
        })
        .catch((err) => {
            console.log(err);
            res.send('Authentication failed');
        })
    }
})
module.exports = router;
