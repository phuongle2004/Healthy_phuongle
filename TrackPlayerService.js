import TrackPlayer from 'react-native-track-player';

export const playbackService = async () => {
  try {
    // const state = await TrackPlayer.getState();
    
    // Kiểm tra xem player đã được khởi tạo chưa
    if (state === TrackPlayer.STATE_NONE) {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: true,
      });
    }

    // Thêm các sự kiện sau khi player đã được khởi tạo
    TrackPlayer.addEventListener('playback-error', (error) => {
      console.log('Lỗi phát lại: ', error.message);
    });

    TrackPlayer.addEventListener('remote-play', async () => {
      try {
        await TrackPlayer.play();
      } catch (error) {
        console.error('Lỗi xử lý sự kiện remote-play:', error);
      }
    });

    TrackPlayer.addEventListener('remote-pause', async () => {
      try {
        await TrackPlayer.pause();
      } catch (error) {
        console.error('Lỗi xử lý sự kiện remote-pause:', error);
      }
    });

    TrackPlayer.addEventListener('remote-next', async () => {
      try {
        await TrackPlayer.skipToNext();
      } catch (error) {
        console.error('Lỗi xử lý sự kiện remote-next:', error);
      }
    });

    TrackPlayer.addEventListener('remote-previous', async () => {
      try {
        await TrackPlayer.skipToPrevious();
      } catch (error) {
        console.error('Lỗi xử lý sự kiện remote-previous:', error);
      }
    });

    TrackPlayer.addEventListener('remote-stop', async () => {
      try {
        await TrackPlayer.stop();
      } catch (error) {
        console.error('Lỗi xử lý sự kiện remote-stop:', error);
      }
    });

    // Thêm các listener khác nếu cần

  } catch (error) {
    console.error('Lỗi khi thiết lập dịch vụ phát lại:', error);
  }
};
