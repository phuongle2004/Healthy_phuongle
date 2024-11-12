// Dangnhap.js
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

const Dangnhap = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const xuLyDangNhap = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('Người dùng đã đăng nhập!');
      Alert.alert('Đăng nhập thành công', 'Xin chào!!!', [
        { text: 'OK', onPress: () => navigation.navigate('tab') }
      ]);
    } catch (error) {
      console.error('Lỗi khi đăng nhập: ', error);
      Alert.alert('Đăng nhập không hợp lệ', 'Email hoặc mật khẩu không đúng');
    }
  };
  

  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.45)" />

      <View style={styles.imageContainer}>
        <Image
          source={require('../images/c12.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.overlay}>
          <View style={styles.loginContainer}>
            <Text style={styles.hello}>CHÀO MỪNG TRỞ LẠI!</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Địa chỉ Email</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Nhập email của bạn"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mật khẩu</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Nhập mật khẩu của bạn"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity onPress={xuLyDangNhap}>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>ĐĂNG NHẬP</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Dangnhap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginContainer: {
    width: '100%',
    height: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopEndRadius: 50,
    borderTopLeftRadius: 50,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  hello: {
    color: 'black',
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 6,
  },
  inputContainer: {
    marginTop: 12,
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 55,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'black',
    paddingHorizontal: 10,
    color: 'black',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 20,
    width: 280,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    color: 'black',
    fontSize: 15,
    marginBottom: 2,
  },
});
