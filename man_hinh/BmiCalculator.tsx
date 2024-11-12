// BMI.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const BMI = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { gender, height: initialHeight, weight: initialWeight } = route.params || {};

  // State để lưu chiều cao và cân nặng
  const [height, setHeight] = useState(initialHeight || '');
  const [weight, setWeight] = useState(initialWeight || '');

  // Chức năng tính toán BMI
  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100; // Chuyển đổi cm thành mét
      const weightInKg = parseFloat(weight);
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      return bmi.toFixed(2);
    }
    return null;
  };

  const bmi = calculateBMI();

  // Khuyến cáo thực đơn dựa trên chỉ số BMI
  const getDietRecommendation = (bmi) => {
    if (bmi < 18.5) {
      return [
        'Bữa sáng: Yến mạch với sữa và trái cây tươi.',
        'Bữa trưa: Cơm gà với rau xanh và nước sốt.',
        'Bữa tối: Thịt bò xào với nấm và mì ống.',
        'Snack: Các loại hạt và sinh tố trái cây.'
      ];
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return [
        'Bữa sáng: Trứng chiên với rau và bánh mì nguyên cám.',
        'Bữa trưa: Salad cá hồi với dầu ô liu.',
        'Bữa tối: Ức gà nướng với quinoa và rau củ.',
        'Snack: Yogurt Hy Lạp với mật ong và trái cây.'
      ];
    } else if (bmi >= 25 && bmi < 29.9) {
      return [
        'Bữa sáng: Sinh tố xanh với rau xanh và trái cây.',
        'Bữa trưa: Cơm lứt với gà nướng và rau luộc.',
        'Bữa tối: Cá hấp với súp rau.',
        'Snack: Trái cây tươi và hạt chia.'
      ];
    } else {
      return [
        'Bữa sáng: Cháo yến mạch với trái cây và hạt chia.',
        'Bữa trưa: Salad rau củ với đậu hũ và sốt giấm.',
        'Bữa tối: Súp bí đỏ với rau củ và gà nướng.',
        'Snack: Trái cây tươi và trà xanh.'
      ];
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Gầy';
    if (bmi >= 18.5 && bmi < 24.9) return 'Bình thường';
    if (bmi >= 25 && bmi < 29.9) return 'Thừa cân';
    return 'Béo phì';
  };

  const recommendation = bmi ? getDietRecommendation(bmi) : [];
  const bmiCategory = bmi ? getBMICategory(bmi) : '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin tính chỉ số BMI:</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Chiều cao (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={height}
          onChangeText={text => setHeight(text.replace(/[^0-9]/g, ''))} // Chỉ cho phép số
          placeholder="Nhập chiều cao"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cân nặng (kg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={text => setWeight(text.replace(/[^0-9]/g, ''))} // Chỉ cho phép số
          placeholder="Nhập cân nặng"
        />
      </View>

      <Text style={styles.title}>Chỉ số BMI của bạn là:</Text>
      <Text style={styles.bmi}>{bmi ? bmi : 'Chưa có dữ liệu'}</Text>
      <Text style={styles.bmiCategory}>{bmiCategory ? `Đánh giá: ${bmiCategory}` : ''}</Text>
      <Text style={styles.recommendation}>
        {bmi ? `Khuyến cáo ăn uống: ${recommendation.join('\n')}` : ''}
      </Text>

      <Button 
        title="Quay lại"
        color="#FF6347" // Màu sắc của nút quay lại
        onPress={() => navigation.goBack()} // Quay lại màn hình trước đó
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF', // Màu nền
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E8B57', // Màu của tiêu đề
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#4682B4', // Màu của nhãn
  },
  input: {
    borderWidth: 1,
    borderColor: '#87CEEB', // Màu viền của input
    padding: 8,
    borderRadius: 5,
    width: '100%',
    fontSize: 18,
    backgroundColor: '#FFFFFF', // Màu nền của input
  },
  bmi: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF4500', // Màu của chỉ số BMI
  },
  bmiCategory: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF8C00', // Màu của cấp bậc BMI
  },
  recommendation: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red', // Màu của khuyến cáo
    marginVertical: 20,
  },
});

export default BMI;
