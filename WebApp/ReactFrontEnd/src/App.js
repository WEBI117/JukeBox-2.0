import React, {useEffect, useState} from 'react';
import './App.css';
import Testcomponentfun from './components/testcomponentfunctional/testcomponentfunction'
import Testcomponentclass from './components/testcomponentclass/testcomponentclass'
import SpotifyPlayerComponent from './components/SpotifyPlayerComponent/SpotifyPlayer';
import SongList from './components/SongListComponent/SongList';

// Helper Functions.

// TODO: Initiliza Spotify SDK script programmatically...
function App() {
  const [player, setPlayer] = useState(null);
  const [token, setToken] = useState('BQAoboMbDXKlETPAHvzKHfu6xomFhFATsPVh8EsiB0PPy36hsctxw2iB33hr8dZYhLra3T2AbWS-abRL6hrq4eRsoyX2LCBwGCBJ4XqcT_qfjxcSQf_A8KVu3StiW3lzv2MgHDY7s6CLnn8os1niCVXX8D0Nbe-i0_OaHi1bw3QOqvJ1v4O7LEI');
  // Add useEffect hook to get access token from backend.
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
      <SongList/>
    </div>
  );
}

export default App;
