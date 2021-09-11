const fetch = require('node-fetch')

class urlHelper{
    constructor(){
        throw console.error("Invoking constructor on a static class");
    }
    static createHeaders = (keyValuePairs) => {
        var headers = new fetch.Headers();
        var keys = Object.keys(keyValuePairs);
        for(var x = 0; x < keys.length; x++){
            headers.append(keys[x], keyValuePairs[keys[x]])
        }
        return headers;
    }
    
    static createBody = (keyValuePairs) => {
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
    
    static createURL = (url, queryParams) => {
        var queryParamsString = new URLSearchParams(queryParams).toString();
        var returnURL = url;
        if(queryParamsString != ""){
            returnURL = returnURL + "?" +  queryParamsString;
        }
        return returnURL;
    } 
}
module.exports = urlHelper;