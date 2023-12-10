import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, View,Image,TouchableOpacity } from 'react-native';

import Button from '../../components/Button';

import styles from './styles'; 


const Splash = ({navigation}) => {
    const onSignup = () => {
        navigation.navigate('Signup');
    };
    const onLogin = () => {
      navigation.navigate('Login')
    };
  return (
    <View style={styles.container}>
    <Image
      resizeMode="contain"
      style={styles.image}
      source={require('../../images/screeUI.jpg')}
    />
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Bạn gặp vấn về sức khỏe</Text>
      <Text style={[styles.title, styles.innerTitle]}>Tất cả bạn cần</Text>
      <Text style={styles.title}>Đã có tại ứng dụng DHP</Text>
      <Text style={styles.titleChild}>
        Digital Health Platforms ứng dụng di động cho việc đặt lịch hẹn, tư
        vấn, và theo dõi thông tin sức khỏe cá nhân
      </Text>
    </View>
    <Button title="Đăng ký" onPress={onSignup}/>
    <TouchableOpacity  onPress={onLogin} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Text style={styles.footerText}>Đăng nhập</Text>
    </TouchableOpacity>
  </View>

  );
};


export default Splash;