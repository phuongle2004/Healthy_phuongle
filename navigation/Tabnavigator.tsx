import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'


import Icon from 'react-native-vector-icons/Ionicons'


import BanThan from '../man_hinh/BanThan'
import Run from '../man_hinh/Run'
import Note from '../man_hinh/Note'
import Music from '../man_hinh/Music'
import TrangChu from '../man_hinh/TrangChu'




const Tab = createBottomTabNavigator();


const Tabnavigator = () => {
  const [selectedTab, setSelectedTab] = useState('home');

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name='home'
        component={TrangChu}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.tabBarButton, { backgroundColor: focused ? 'white' : 'gray' }]}>
              <Icon name="home-outline" size={24} color={focused ? 'black' : 'white'} />
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            setSelectedTab('home');
          },
        })}
      />
      <Tab.Screen
        name='amNhac'
        component={Music}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.tabBarButton, { backgroundColor: focused ? 'white' : 'gray' }]}>
              <Icon name="musical-notes-outline" size={24} color={focused ? 'black' : 'white'} />
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            setSelectedTab('amNhac');
          },
        })}
      />
      <Tab.Screen
        name='diBo'
        component={Run}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.tabBarButton, { backgroundColor: focused ? 'white' : 'gray' }]}>
              <Icon name="bicycle-outline" size={24} color={focused ? 'black' : 'white'} />
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            setSelectedTab('diBo');
          },
        })}
      />
      <Tab.Screen
        name='bietOn'
        component={Note}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.tabBarButton, { backgroundColor: focused ? 'white' : 'gray' }]}>
              <Icon name="clipboard-outline" size={24} color={focused ? 'black' : 'white'} />
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            setSelectedTab('bietOn');
          },
        })}
      />

      <Tab.Screen
        name='banThan'
        component={BanThan}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[styles.tabBarButton, { backgroundColor: focused ? 'white' : 'gray' }]}>
              <Icon name="person-outline" size={24} color={focused ? 'black' : 'white'} />
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            setSelectedTab('banThan');
          },
        })}
      />


    </Tab.Navigator>
  );
}


export default Tabnavigator

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    position: 'absolute',
    backgroundColor: 'gray',
    borderTopWidth: 1,
    elevation: 5,
    borderRadius: 30,
    shadowColor: '#000',
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  tabBarButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});