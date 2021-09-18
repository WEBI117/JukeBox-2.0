const MusicQueue = require('../DataClasses/MusicQueue');
var TokenHandler = require('../Services/TokenHandler');

class ClassLoaderSingleton{
    constructor() {
        this.instance = new ClassLoader()
    }
    getInstance(){
        if(this.instance === null){
            this.instance = new ClassLoader();
        }
        return this.instance;
    }
}

/**
 *  Class loader module:
 *  Initializes all Data Class instances requred by the app runtime.
 */
class ClassLoader {
    // Declare all class variables to be exported.
    constructor(){
        this.musicQueue = null;
        // Token handler is initialized using specicific arguments and can therefore must be initialized explicitly.
        this.tokenHandler = null;
        // Initialized check....May be redundant....refactor if necessary.
        this.isInitialized = false;
    }



    // Initialize all class intances.
    // May possibly use command line arguments to initialize objects in the future.
    Initialize(){
        this.musicQueue = new MusicQueue();
        this.tokenHandler = new TokenHandler();

        this.isInitialized = true;
    }
    
}


// Using javascript caching to export class as a singleton.
module.exports = new ClassLoaderSingleton().getInstance();