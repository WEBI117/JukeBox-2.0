import React, {useEffect, useState} from 'react';
import './App.css';
import Testcomponentfun from './components/testcomponentfunctional/testcomponentfunction'
import Testcomponentclass from './components/testcomponentclass/testcomponentclass'
import SpotifyPlayerHelper from './Helpers/SpotifyPlayerHelper';

// Helper Functions.

// TODO: Initiliza Spotify SDK script programmatically...
function App() {
  const [player, setPlayer] = useState({});
  const [tokenObj, setTokenObj] = useState({});
  useEffect(() => {
    console.log(`Token updated to ${tokenObj.access_token}`)
  }, [tokenObj])
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script)

    // replace with original after testing.
    //getOAuthToken: cb => { SpotifyPlayerHelper.refresAccessToken(cb,setTokenObj); },
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { SpotifyPlayerHelper.refresAccessToken(cb,setTokenObj); },
        volume: 0.5
      });

      setPlayer(player);
      
      // Ready
      player.on('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.on('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.on('initialization_error', ({ message }) => {
        console.error(message);
      });

      player.on('authentication_error', ({ message }) => {
        console.error(message);
      });

      player.on('account_error', ({ message }) => {
        console.error(message);
      });

      player.connect();
    }
  }, [])


  return (
    <div className="App">
      <Testcomponentfun message='hello'/>
    </div>
  );
}

export default App;
