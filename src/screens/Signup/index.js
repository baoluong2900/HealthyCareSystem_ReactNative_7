import React, { useContext, useState,useEffect} from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Input from '../../components/Input';
import Separator from '../../components/Separator';
import GoogleLogin from '../../components/GoogleLogin';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { registerUser } from '../../utils/backendCallAPIs';
import { callAPI } from '../../utils/backendCallAPIs';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


const Signup = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({});
  const [userRoleNo, setUserRoleNo] = useState(2);

  const onSignIn = () => {
    navigation.navigate("Login");
  };
  const onBack = () => {
    navigation.goBack();
  };
  const onChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
  };
  const onSubmit = async () => {
    try {
      if (!values?.lastName || !values?.firstName || !values?.email || !values?.password || !values?.confirmPassword) {
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
      values.userRoleNo = userRoleNo;
      const user = await registerUser(values);
      Alert.alert(user.showMessages);
      if(user.isError) {
        setValues({});
        setChecked(false)
      }
  
    } catch (error) {
      console.log('error :>> ',user.showMessages);
    }
  };

  const radio_props = [
    { label: "Người dùng    ", value: 2},
    { label: "Nhân viên chăm sóc y tế", value: 1 },
  ];
  const onChangeRadio = (value) => {
    setValues({
      ...values,
      userRoleNo: value,
    });
  };
  
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader onBackPress={onBack} title='Đăng ký' />
        <Input value={values.firstName} onChangeText={v => onChange('firstName', v)} label='Tên' placeholder='Văn A' />
        <Input value={values.lastName} onChangeText={v => onChange('lastName', v)} label='Họ' placeholder='Nguyễn ' />
        <Input value={values.email} onChangeText={v => onChange('email', v)} label='Email' placeholder='example@gmail.com' />
        <RadioForm
          radio_props={radio_props}
          formHorizontal={true}
          onPress={onChangeRadio}
          style={styles.radioSpacing}
        />

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
