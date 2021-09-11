class songQueue{
    constructor(){
        this.songsList = [];
    }
    addSong(songName, artist){
        var songObject = {
            "song": songName,
            "artist": artist
        }
        this.push()
    }
}
module.exports = UserQueue;
