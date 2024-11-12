import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './TrackPlayerService';

// Register the playback service
TrackPlayer.registerPlaybackService(() => playbackService);

// Register the main component
AppRegistry.registerComponent(appName, () => App);
