import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, logout } from '../android/app/src/redux/reducer/profileSlice'; // Adjust the correct path to profileSlice
import { useNavigation } from '@react-navigation/native';

const BanThan = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const [editable, setEditable] = useState(false);
  const [gender, setGender] = useState('Nữ');
  const [height, setHeight] = useState('155 cm');
  const [weight, setWeight] = useState('45 kg');

  const handleEdit = (field, value) => {
    dispatch(setProfile({ [field]: value }));
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleBMIClick = () => {
    navigation.navigate('bmi', {
      gender: gender,
      height: height,
      weight: weight,
    });
  };

  const handleLogout = () => {
    navigation.navigate('manChao');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/564x/73/c8/a4/73c8a4f95e0630c26e3226a82135d36a.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Ảnh đại diện</Text>
        <Image source={{ uri: 'https://png.pngtree.com/png-clipart/20210711/original/pngtree-cute-blue-and-purple-cartoon-avatar-png-image_6519774.jpg' }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Người dùng</Text>
          {editable ? (
            <TextInput
              style={styles.input}
              value={profile.username}
              onChangeText={text => handleEdit('username', text)}
              placeholder="Nhập tên"
              placeholderTextColor="#888"
            />
          ) : (
            <Text style={styles.value}>{profile.username}</Text>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Giới tính</Text>
          {editable ? (
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholder="Nhập giới tính"
              placeholderTextColor="#888"
            />
          ) : (
            <Text style={styles.value}>{gender}</Text>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Chiều cao</Text>
          {editable ? (
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="Nhập chiều cao"
              placeholderTextColor="#888"
            />
          ) : (
            <Text style={styles.value}>{height}</Text>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Cân nặng</Text>
          {editable ? (
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder="Nhập cân nặng"
              placeholderTextColor="#888"
            />
          ) : (
            <Text style={styles.value}>{weight}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: editable ? '#81C784' : '#ADD8E6' }]}
          onPress={toggleEditable}
        >
          <Text style={styles.buttonText}>{editable ? 'Lưu' : 'Chỉnh sửa'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgba(136, 136, 136, 0.5)' }]}
          onPress={handleBMIClick}
        >
          <Text style={styles.buttonText}>Đo chỉ số BMI</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#8B5F65' }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(245, 245, 245, 0.5)', // Light background with opacity for readability
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'black',
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    width: 120,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,

  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BanThan;
