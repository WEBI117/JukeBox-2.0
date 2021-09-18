const urlHelper = require('../Helpers/UrlHelper');

module.exports = class AuthHelper{
    // Reads Client ID and Secret from textfile and stores it in local variables.
    static readClientIDandSecret = (filepath) => {
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

    static parseSpotifyDetailsString = (inputString) => {
        var endLineSplitArray = inputString.split('\n');
        var returnDictionary = {};
        for(var x = 0; x < endLineSplitArray.length; x++){
            var spaceSplitArray = endLineSplitArray[x].split(' ');
            returnDictionary[spaceSplitArray[0]] = spaceSplitArray[1];
        }
        return returnDictionary;
    }

    static createSpotifyAuthCodeURL = (clientid, redirectUri) => {
        var parameters = {
            "client_id":clientid,
            "response_type":"code",
            "redirect_uri":redirectUri,
            "scope":"streaming user-read-email user-read-private"
        }
        return urlHelper.createURL("https://accounts.spotify.com/authorize", parameters);
    }

    static createTokenRequestURL = () => {
        return "https://accounts.spotify.com/api/token" 
    }

    static createTokenRequestHeaders = (authorization_string) => {
        var headerObject = {
            "Authorization": authorization_string,
            "Content-Type":"application/x-www-form-urlencoded"
        }
        return urlHelper.createHeaders(headerObject);
    }

    static createTokenrequestBody = (authCode, redirect_uri) => {
        var bodyobj = {
            "grant_type":"authorization_code",
            "code":authCode,
            "redirect_uri":redirect_uri
        }
        return urlHelper.createBody(bodyobj);
    }

    static getAuthorizationString = (clientid,clientsecret) => {
        return "Basic" + ' ' + Buffer.from(clientid + ":" + clientsecret).toString("base64");
    }
}