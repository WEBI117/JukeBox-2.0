const MusicQueue = require('../DataClasses/MusicQueue');

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
        // Initialized check....May be redundant....refactor if necessary.
        this.isInitialized = false;
    }



    // Initialize all class intances.
    // May possibly use command line arguments to initialize objects in the future.
    Initialize(){
        this.musicQueue = new MusicQueue();

        this.isInitialized = true;
    }
    
}


// Using javascript caching to export class as a singleton.
module.exports = new ClassLoaderSingleton().getInstance();