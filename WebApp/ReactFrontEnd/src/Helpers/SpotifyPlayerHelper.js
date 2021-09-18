class SpotifyPlayerHelper{
    constructor(){
        throw new Error('Initializing static resource.');
    }
    // Use the fetch API to request the backend for a new token.
    static async refresAccessToken(cb, setTokenStateFunction){
        var tokenObject = await(this.getTokenObject());
        setTokenStateFunction(tokenObject);
        cb(tokenObject.access_token)
    }
    static getTokenObject(){
        var URL = "http://localhost:9000/accesstoken";
        return new Promise((res,rej) => {
            fetch(URL,{
                method:"GET"
            })
            .then(resp => resp.text())
            .then(resp => {
                var tokenObject = JSON.parse(resp);
                res(tokenObject);
            })
            .catch(err => {
                console.log(err);
                rej(err);
            })
        })
    }
}

module.exports = SpotifyPlayerHelper;