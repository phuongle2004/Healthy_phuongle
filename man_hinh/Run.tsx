import React, { useState, useEffect, useCallback } from 'react';
import { Button, Text, View, Platform } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { request, PERMISSIONS, check } from 'react-native-permissions';

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [subscription, setSubscription] = useState(null);

  const startStepCounter = useCallback(async () => {
    try {
      const permission = await request(
        Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION : PERMISSIONS.IOS.MOTION
      );

      if (permission === 'granted') {
        setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // cập nhật mỗi giây

        const sub = accelerometer.subscribe(({ x, y, z, timestamp }) => {
          const magnitude = Math.sqrt(x * x + y * y + z * z);
          if (magnitude > 1.5) {
            setSteps((prevSteps) => prevSteps + 1);
          }
        });

        setSubscription(sub);
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  }, []);

  const stopStepCounter = useCallback(() => {
    if (subscription) {
      subscription.unsubscribe();
      setSubscription(null);
    }
  }, [subscription]);

  const saveStepsToFirebase = useCallback(async () => {
    const userId = await AsyncStorage.getItem('userId'); // lấy userId từ AsyncStorage

    if (userId) {
      database()
        .ref(`/steps/${userId}`)
        .push({
          steps,
          timestamp: database.ServerValue.TIMESTAMP,
        })
        .then(() => console.log('Step count saved to Firebase'))
        .catch((error) => console.error('Error saving step count to Firebase:', error));
    } else {
      console.error('No userId found in AsyncStorage');
    }
  }, [steps]);

  return (
    <View>
      <Text>Steps: {steps}</Text>
      <Button title="Start" onPress={startStepCounter} />
      <Button title="Stop" onPress={stopStepCounter} />
      <Button title="Save to Firebase" onPress={saveStepsToFirebase} />
    </View>
  );
};

export default StepCounter;
