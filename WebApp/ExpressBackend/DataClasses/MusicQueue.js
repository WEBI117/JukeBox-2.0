module.exports = class musicQueue{
    constructor(){
        this.songsList = [];
        this.currentlyPlaying = {};
    }
    playNext(){
        if(this.songsList.length != 0){
            this.currentlyPlaying = this.currenlyPlaying.pop();
        }
        else{
            console.log("Currently no songs in song list to play.")
        }
    }
    addSong(song){
        this.songsList.unshift(song);
    }
    testQueue(){
        console.log('Hello from music queue.');
    }
}