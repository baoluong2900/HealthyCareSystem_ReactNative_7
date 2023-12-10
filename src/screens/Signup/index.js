import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import Separator from '../../components/Separator';
import GoogleLogin from '../../components/GoogleLogin';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signup } from '../../../utils/backendCalls';
import axios from 'axios';


//function callAPI(data) {
  // return axios.post('https://localhost:44370/api/Register', data)
  //   .then(response => {
  //     console.log(response.data);
  //     return response.data;
  //   })
  //   .catch(error => console.error(error));
//}
// function callAPI() {
//   return fetch('http://192.168.1.12:2030/WeatherForecast')
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       return data;
//     })
//     .catch(error => console.error(error));
// }

function callAPI() {
  return axios.get('http://192.168.1.12:2030/WeatherForecast')
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(error => console.error(error));
}

const Signup = ({ navigation }) => {
  const [checked, setChecked] = useState(true);
  const [values, setValues] = useState({});
  // const { setUser } = useContext(UserContext);
  const onSignIn = () => {
    navigation.navigate("Login");
  };
  callAPI();
  const onBack = () => {
    navigation.goBack();
  };

  const onChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    console.log(value);
  };
  const onSubmit = async () => {
    try {
      if (!values?.lastName || !values?.firstName   || !values?.email || !values?.password || !values?.confirmPassword) {
        Alert.alert('Tất cả trường không được phép bỏ trống');
        return;
      }

      if (values?.password !== values?.confirmPassword) {
        Alert.alert('Mật khẩu không khớp');
        return;
      }

      if (!checked) {
        Alert.alert('Vui lòng chọn điều khoản');
        return;
      }

      // let token = await signup(values);
      // setUser({ token });
      const test = callAPI(values);

      Alert.alert('Đăng ký thành công');
      // setValues({});
    // /  setChecked(false)
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title='Đăng ký' />
        <Input value={values.lastName} onChangeText={v => onChange('lastName', v)} label='Họ' placeholder='Nguyễn ' />
        <Input value={values.firstName} onChangeText={v => onChange('firstName', v)} label='Tên' placeholder='Văn A' />
        <Input value={values.email} onChangeText={v => onChange('email', v)} label='Email' placeholder='example@gmail.com' />
        <Input value={values.password} onChangeText={v => onChange('password', v)} isPassword label='Mật khẩu' placeholder='*******' />
        <Input value={values.confirmPassword} onChangeText={v => onChange('confirmPassword', v)} isPassword label='Nhập lại mật khẩu' placeholder='*******' />

        <View style={styles.agreeRow}>
          <Checkbox checked={checked} onCheck={setChecked} />
          <Text style={styles.agreeText}>Tôi đồng ý với<Text style={styles.agreeTextBold}> Điều khoản</Text> & <Text style={styles.agreeTextBold}>Quyền riêng tư</Text></Text>
        </View>

        <Button onPress={onSubmit} style={styles.button} title='Đăng ký' />

        <Separator text='Hoặc đăng nhập với' />

        <GoogleLogin />

        <Text style={styles.footerText}>
         Bạn đã có tài khoản ?
          <Text onPress={onSignIn} style={styles.footerLink}> Đăng nhập</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
