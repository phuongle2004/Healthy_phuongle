import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './android/app/src/redux/store/store'; // Ensure this is the correct path to your store
import Manchao from './man_hinh/Manchao';
import DangKy from './man_hinh/DangKy';
import Dangnhap from './man_hinh/Dangnhap';
import TrangChu from './man_hinh/TrangChu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabnavigator from './navigation/Tabnavigator';
import Run from './man_hinh/Run';
import Note from './man_hinh/Note';
import BanThan from './man_hinh/BanThan';
import BmiCalculator from './man_hinh/BmiCalculator';
import Music from './man_hinh/Music';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="tab"
        >
          <Stack.Screen name='manChao' component={Manchao} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name='dangKy' component={DangKy} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name='dangNhap' component={Dangnhap} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name='tab' component={Tabnavigator} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name='trangChu' component={TrangChu} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name='run' component={Run} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name='note' component={Note} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name='banthan' component={BanThan} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name='bmi' component={BmiCalculator} options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name='music' component={Music} options={{ animation: 'slide_from_bottom' }} />


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
