import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform, StatusBar, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUserName } from '../android/app/src/redux/reducer/profileSlice'; // Ensure this import is correct

const DangKy = ({ navigation }) => {
  const dispatch = useDispatch(); // Get dispatch function
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!email || !password || !username) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
  
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (!userCredential) {
          throw new Error('UserCredential is undefined');
        }
  
        const user = userCredential.user;
        if (!user) {
          throw new Error('User is undefined');
        }
  
        // Save user information to Firestore
        return firestore()
          .collection('HeathyApp')
          .doc(user.uid)
          .set({
            username: username,
            email: user.email,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
      })
      .then(() => {
        console.log('User added to Firestore!');
        dispatch(setUserName(username)); // Save username to Redux
        Alert.alert(
          'Thành công',
          'Đăng ký thành công!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('dangNhap'),
            },
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Lỗi', `Có lỗi xảy ra khi tạo tài khoản: ${error.message}`);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.45)" />

      <Image
        source={require('../images/c12.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.overlay}>
          <View style={styles.loginContainer}>
            <Text style={styles.hello}>WELCOME BACK!</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Enter your username"
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Enter your password"
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity onPress={handleRegister}>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>ĐĂNG KÝ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light gray with opacity
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
    marginBottom: 10,
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

export default DangKy;
