import React, {useEffect, useState} from 'react';
import './App.css';
import Testcomponentfun from './components/testcomponentfunctional/testcomponentfunction'
import Testcomponentclass from './components/testcomponentclass/testcomponentclass'
import SpotifyPlayerComponent from './components/SpotifyPlayerComponent/spotifyPlayer';

// Helper Functions.

// TODO: Initiliza Spotify SDK script programmatically...
function App() {
  const [player, setPlayer] = useState(null);
  const [token, setToken] = useState('BQDe_slylH6XrlAF7FAhRhjhvO9PKQz3bGKBIhh1WAb667QXD8UVofIp-TK5RVVyNIk4kYhQPihDUUD_Nx0ybyxzWjNw9CjY4i2_rfua85NUidba7iUp2SzA2mPY8gpo8BUesCrg_DmMPt0gRnrPUDsgSFfWeamqENquShtTI9UOKbj4UKar2eE');
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
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
