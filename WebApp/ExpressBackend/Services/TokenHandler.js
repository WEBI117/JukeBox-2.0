class tokenHandler{
    access_token = "";
    refresh_token = "";
    refresh_timer = "";
    timerInstance = null;
    initialized = false;
    AuthorizationString = "";
    // Todo: 
    get AccessToken(){
        return this.access_token;
    }
    get refresh_token(){
        return this.refresh_token;
    }
    constructor(){
    }
    //Todo: change initialize signature to take in only authorization code.
    initialize(_refresh_token,_access_token,_refresh_timer,authString){
        try{
            this.refresh_token = _refresh_token;
            this.access_token = _access_token;
            this.refresh_timer = _refresh_timer;
            this.timerInstance = setInterval(this.refreshAccessToken,this.refresh_timer, this.refresh_token);
            this.initialized = true;
            this.AuthorizationString = authString;
        }
        catch{

        }
   }
   refreshAccessToken(refresToken){
    // Todo: implementation.
    // use refresh token to make a fetch request to get new access token

   }
}
module.exports = tokenHandler; 