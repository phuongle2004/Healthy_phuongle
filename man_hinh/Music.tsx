import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';

const musicList = [
  {
    id: '1',
    title: 'Nhạc thiền Yoga thư giãn sâu',
    image: 'https://picsum.photos/200?random=1',
    url: 'https://a128-z3.zmdcdn.me/350d55e66574dd01f538bfbdf2592457?authen=exp=1722256914~acl=/350d55e66574dd01f538bfbdf2592457/*~hmac=1deba1cb7637eac252cf855ceb532b33',
  },
  {
    id: '2',
    title: 'Âm Thanh Thiền Đêm Khuya',
    image: 'https://picsum.photos/200?random=2',
    url: 'https://a128-z3.zmdcdn.me/1951abc606e87b5a9f1196e62dd5979a?authen=exp=1722267118~acl=/1951abc606e87b5a9f1196e62dd5979a/*~hmac=48799f2d322732b1da6229598b433a5d',
  },
  {
    id: '3',
    title: 'Nhạc Yoga Để Tăng Cường Sức Khỏe',
    image: 'https://picsum.photos/200?random=3',
    url: 'https://a128-z3.zmdcdn.me/528628a98f496b04b2151a59dcd6451d?authen=exp=1722267868~acl=/528628a98f496b04b2151a59dcd6451d/*~hmac=22461cc277bd522e3b473c73134780ff',
  },
  {
    id: '4',
    title: 'Âm Thanh Yoga Tĩnh Lặng',
    image: 'https://picsum.photos/200?random=4',
    url: 'https://a128-z3.zmdcdn.me/8f297a5b8856250fe30fc4bf6127f347?authen=exp=1722267563~acl=/8f297a5b8856250fe30fc4bf6127f347/*~hmac=af82b8a16d3f324e4596ec1f93233f75',
  },
  {
    id: '5',
    title: 'Nhạc Thiền Tĩnh Lặng',
    image: 'https://picsum.photos/200?random=5',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
  {
    id: '6',
    title: 'Nhạc Thiền Sáng Tạo',
    image: 'https://picsum.photos/200?random=6',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
  {
    id: '7',
    title: 'Nhạc Đêm Bình Yên',
    image: 'https://picsum.photos/200?random=7',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
  {
    id: '8',
    title: 'Âm Thanh Đêm Tĩnh Lặng',
    image: 'https://picsum.photos/200?random=8',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
  {
    id: '9',
    title: 'Nhạc Thiền Hòa Quyện',
    image: 'https://picsum.photos/200?random=9',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
  {
    id: '10',
    title: 'Âm Thanh Tĩnh Tâm',
    image: 'https://picsum.photos/200?random=10',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
  {
    id: '11',
    title: 'Nhạc Thiền Buổi Sáng',
    image: 'https://picsum.photos/200?random=11',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
  {
    id: '12',
    title: 'Nhạc Thiền Buổi Tối',
    image: 'https://picsum.photos/200?random=12',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
  {
    id: '13',
    title: 'Nhạc Thiền Phục Hồi',
    image: 'https://picsum.photos/200?random=13',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
  {
    id: '14',
    title: 'Âm Thanh Thiền Tĩnh Lặng',
    image: 'https://picsum.photos/200?random=14',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
  {
    id: '15',
    title: 'Nhạc Thiền Trưa Nắng',
    image: 'https://picsum.photos/200?random=15',
    url: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
  },
];

const Music = () => {
  const [playing, setPlaying] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);
  const isPlayerSetup = useRef(false);

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        //const state = await TrackPlayer.getState();
        // if (state === TrackPlayer.STATE_NONE) {
          await TrackPlayer.setupPlayer();
          await TrackPlayer.updateOptions({
            stopWithApp: true,
          });
        // }
        isPlayerSetup.current = true;
        setPlayerReady(true);
      } catch (error) {
        console.error('Lỗi khi thiết lập TrackPlayer:', error);
      }
    };

    setupPlayer();

    return () => {
      const cleanup = async () => {
        try {
          if (isPlayerSetup.current) {
            await TrackPlayer.stop();
            await TrackPlayer.reset();
            isPlayerSetup.current = false;
          }
        } catch (error) {
          console.error('Lỗi khi dọn dẹp TrackPlayer:', error);
        }
      };
      cleanup();
    };
  }, []);

  const handlePlayPause = async (item) => {
    if (!playerReady) return;

    try {
      if (playing === item.id) {
        await TrackPlayer.pause();
        setPlaying(null);
        setCurrentTrack(null);
      } else {
        if (isPlayerSetup.current) {
          await TrackPlayer.reset();
          await TrackPlayer.add({
            id: item.id,
            url: item.url,
            title: item.title,
            artist: 'Artist',
          });
          await TrackPlayer.play();
          setPlaying(item.id);
          setCurrentTrack(item);
        }
      }
    } catch (error) {
      console.error('Lỗi xử lý phát/dừng:', error);
    }
  };

  const skip = async (seconds) => {
    if (playerReady && playing) {
      try {
        const position = await TrackPlayer.getPosition();
        await TrackPlayer.seekTo(position + seconds);
      } catch (error) {
        console.error('Lỗi khi bỏ qua track:', error);
      }
    }
  };

  const filteredMusicList = musicList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={() => handlePlayPause(item)} style={styles.button}>
          <Icon name={playing === item.id ? 'pause-circle' : 'play-circle'} size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.header}>Danh Sách Nhạc</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm bài nhạc..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {currentTrack && (
          <View style={styles.nowPlayingContainer}>
            <Image source={{ uri: currentTrack.image }} style={styles.nowPlayingImage} />
            <View style={styles.nowPlayingInfo}>
              <Text style={styles.nowPlayingTitle}>{currentTrack.title}</Text>
              <View style={styles.controlsContainer}>
                <TouchableOpacity onPress={() => skip(-10)} style={styles.skipButton}>
                  <Icon name="play-back" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => skip(10)} style={styles.skipButton}>
                  <Icon name="play-forward" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                  if (playing) {
                    await TrackPlayer.pause();
                    setPlaying(null);
                  } else if (currentTrack) {
                    await TrackPlayer.play();
                    setPlaying(currentTrack.id);
                  }
                }} style={styles.playPauseButton}>
                  <Icon name={playing ? 'pause-circle' : 'play-circle'} size={40} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <FlatList
          data={filteredMusicList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  button: {
    marginLeft: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  listContainer: {
    marginTop: 20,
  },
  nowPlayingContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  nowPlayingImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  nowPlayingInfo: {
    flex: 1,
    alignItems: 'center',
  },
  nowPlayingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  skipButton: {
    marginHorizontal: 10,
  },
  playPauseButton: {
    marginHorizontal: 20,
  },
});

export default Music;
