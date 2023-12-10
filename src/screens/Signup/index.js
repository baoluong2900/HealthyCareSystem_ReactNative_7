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

const Signup = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({});
  // const { setUser } = useContext(UserContext);
  const onSignIn = () => {
    navigation.navigate("Login");
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
  };
  const onSubmit = () => {

  }
  return (
    <SafeAreaView>
            <ScrollView style={styles.container}>
                <AuthHeader onBackPress={onBack} title='Đăng ký' />

                <Input value={values.fullName} onChangeText={v => onChange('fullName', v)} label='Họ và tên' placeholder='Nguyễn Văn A' />
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
                    Already have an account?
                    <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
  );
};

export default Signup;
