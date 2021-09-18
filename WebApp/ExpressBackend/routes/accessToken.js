const express = require("express");
const router = express.Router();
const classLoader = require("../Services/ClassLoader");
const urlHelper = require('../Helpers/UrlHelper');
const fetch = require('node-fetch');

router.get('/', (req,res,next) => {
    var URL = 'https://accounts.spotify.com/api/token'
    var Headers = urlHelper.createHeaders({
        "Authorization": classLoader.tokenHandler.AuthorizationString,
        "Content-Type":"application/x-www-form-urlencoded",
    })
    var Body = urlHelper.createBody({
        "grant_type":"refresh_token",
        "refresh_token":classLoader.tokenHandler.refresh_token,
    })
    fetch(URL,{
        method:"POST",
        headers: Headers,
        body: Body
    })
    .then((resp) => resp.text())
    .then((resp) => res.send(resp))
    .catch((err) => {
        console.log(err);
        throw new Error('Request Error.');
    })
})


module.exports = router;