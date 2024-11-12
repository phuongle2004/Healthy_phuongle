import TrackPlayer from 'react-native-track-player';

const TrackPlayerManager = {
  async setup() {
    try {
      const state = await TrackPlayer.getState();
      if (state === TrackPlayer.STATE_NONE) {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          stopWithApp: true,
        });
      }
    } catch (error) {
      console.error('Error setting up TrackPlayer:', error);
    }
  },

  async destroy() {
    try {
      await TrackPlayer.stop();
      await TrackPlayer.reset();
      // Optionally destroy the player if you need a complete reset
      // await TrackPlayer.destroy();
    } catch (error) {
      console.error('Error destroying TrackPlayer:', error);
    }
  },
};

export default TrackPlayerManager;
