import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import firestore from '@react-native-firebase/firestore';

const TrangChu = ({ navigation }) => {
  const [latestNote, setLatestNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLatestNote = async () => {
      const snapshot = await firestore().collection('note').orderBy('date', 'desc').limit(1).get();
      if (!snapshot.empty) {
        const latestNoteDoc = snapshot.docs[0].data();
        setLatestNote(latestNoteDoc.hanhPhuc || '');
      }
    };

    fetchLatestNote();
  }, []);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View >
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={25} style={styles.searchIcon} />
            <TextInput
              placeholder="Which product do you want to search for?"
              style={styles.input}
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
          <Icon name="notifications" size={25} style={styles.icon} />
          <Icon name="chatbubble-ellipses" size={25} style={styles.icon} />
        </View>

        <FastImage
          source={{ uri: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Fyc3VwcGh6Y3lwenBqbjQyYTZvbnloeWpncGgwNXFhMnE4cGxobSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DBbPjLMsQPruMkDcrd/giphy.gif' }}
          style={styles.runningGif}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Text style={styles.hello}>WELCOME BACK!</Text>
        <Text style={styles.hello2}>Hi! Phuong Le</Text>

        <View style={styles.newSection}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => handleNavigation('run')}>
              <LinearGradient colors={['rgba(0, 128, 0, 0.5)', 'rgba(0, 128, 0, 0.1)']} style={styles.gradient}>
                <View style={styles.iconWrapperContent}>
                  <LinearGradient colors={['#54FF9F', '#43CD80']} style={styles.iconCircle}>
                    <Icon name="bicycle-outline" size={40} style={styles.iconInCircle} />
                  </LinearGradient>
                  <Text style={styles.iconText}>Text Line 1</Text>
                  <Text style={styles.iconText}>Text Line 2</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconWrapper2} onPress={() => handleNavigation('note')}>
              <LinearGradient colors={[' rgba(255, 165, 0, 0.5)', 'rgba(255, 165, 0, 0.1)']} style={styles.gradient}>
                <View style={styles.iconWrapperContent}>
                  <LinearGradient colors={['#FFFF66', '#FFCC33']} style={styles.iconCircle}>
                    <Icon name="clipboard-outline" size={40} style={styles.iconInCircle} />
                  </LinearGradient>
                  <Text style={styles.iconText}>{latestNote}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

          </View>

          {/* Right Section */}
          <View style={styles.rightSection}>
            <TouchableOpacity style={styles.iconWrapper2} onPress={() => handleNavigation('banthan')}>
              <LinearGradient colors={['rgba(0, 0, 255, 0.5)', 'rgba(0, 0, 255, 0.1)']} style={styles.gradient}>
                <View style={styles.iconWrapperContent}>
                  <LinearGradient colors={['#B0E2FF', '#87CEFF']} style={styles.iconCircle}>
                    <Icon name="person-outline" size={40} style={styles.iconInCircle} />
                  </LinearGradient>
                  <Text style={styles.iconText}>BMI= 18.73</Text>
                  <Text style={styles.iconText}>Bình Thường</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>



            <View style={styles.additionSection}  >
              <TouchableOpacity style={styles.iconWrapper} onPress={() => handleNavigation('music')} >
                <LinearGradient colors={['rgba(128, 0, 128, 0.5)', 'rgba(128, 0, 128, 0.1)']} style={styles.gradient}>
                  <View style={styles.iconWrapperContent}>
                    <LinearGradient colors={['#FFC1C1', '#FFA500']} style={styles.iconCircle}>
                      <Icon name="musical-notes-outline" size={40} style={styles.iconInCircle} />
                    </LinearGradient>
                    <Text style={styles.iconText}>Nhạc thiền Yoga thư giãn sâu</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  runningGif: {
    width: '95%',
    height: 220,
    marginVertical: 20,
    marginLeft: 10,
    marginRight: 20
  },
  searchSection: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  searchContainer: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  hello: {
    fontSize: 15,
    textAlign: 'center',

    fontWeight: '400',
  },
  hello2: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
  },
  newSection: {
    margin: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  leftSection: {
    flex: 0.5,
    justifyContent: 'space-between',
  },
  rightSection: {
    flex: 0.5,
    justifyContent: 'space-between',
  },
  iconWrapper: {
    marginBottom: 5,
    borderRadius: 30,
    // borderColor: 'white',
    // borderWidth: 1,
    overflow: 'hidden',
    height: 250,
    marginLeft: 10,
    marginRight: 10
  },
  iconWrapper2: {
    marginBottom: 10,
    borderRadius: 30,
    // borderColor: 'white',
    // borderWidth: 1,
    overflow: 'hidden',
    height: 290,
    margin: 10,
    marginLeft: 3,
    marginRight: 5,
  },
  gradient: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 30,
    padding: 10,
    height: 310,
    justifyContent: 'center',
  },
  iconWrapperContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 130
  },
  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  iconInCircle: {
    fontSize: 40,
    color: 'white',
  },
  iconText: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 5,
    color: 'white',
    fontWeight: '500',
  },
  additionSection: {
    justifyContent: 'center',
  },
});

export default TrangChu;
