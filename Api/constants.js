const path = require('path')
class Constants{
    constructor(){
        this.Test = null;
        this.spotifyDetailsFilePath = path.join(__dirname,'spotifyDetails.txt');
    }
    setConstants(CLObj){
        if(CLObj.Test != null){
            this.Test = CLObj.Test
        }
        // Add successive if statements for new Command line arguments...
    }
}
module.exports = new Constants();