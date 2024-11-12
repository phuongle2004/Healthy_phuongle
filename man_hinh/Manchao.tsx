import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const Manchao = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.45)" />

      <Image
        source={require('../images/c12.jpg')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.overlay}>
        <TouchableOpacity  onPress={() => navigation.navigate('dangNhap')}>
          <View style={styles.btn}>
            <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity   onPress={() => navigation.navigate('dangKy')}>
          <View style={styles.btn2}>
            <Text style={styles.buttonText2}>ĐĂNG KÝ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Manchao;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    left: -50, // Dịch ảnh sang trái
    width: '120%', // Tăng chiều rộng để đảm bảo ảnh không bị cắt khi dịch sang trái
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: -27,
    color: 'white',
    fontSize: 19,
    fontWeight: '300',
  },
  text2: {
    fontSize: 28,
    color: 'white',
  },
  btn: {
    backgroundColor: 'white',
    marginTop: 450,
    paddingVertical: 15,
    width: 350,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '800',
  },
  buttonText2: {
    fontSize: 18,
    color: 'black',
    fontWeight: '800',
  },
  btn2: {
    backgroundColor: 'rgba(211, 211, 211, 0.5)', // Màu xám nhạt trong suốt
    marginTop: 20,
    paddingVertical: 13,
    width: 350,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
});
