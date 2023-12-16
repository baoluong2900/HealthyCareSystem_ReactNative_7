import React, { useContext, useState } from 'react';
import { ScrollView, Text,Alert } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import styles from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Separator from '../../components/Separator';
import GoogleLogin from '../../components/GoogleLogin';
import { SafeAreaView } from 'react-native-safe-area-context';
import {loginUser} from '../../utils/backendCallAPIs';

const Login = ({ navigation }) => {
    const [values, setValues] = useState({});

    const onSignUp = () => {
        navigation.navigate('Signup');
    };

    const onLogin = async () => {
        try {
            if (!values?.userName) {
                Alert.alert('Tài khoản đăng nhập không được phép bỏ trống');
                return;
            }

            if (!values?.passWord) {
                Alert.alert('Mật khẩu không được phép bỏ trống');
                return;
            }
            //   // setUser({ token });
            //   const messageRegisterUser = await registerUser(values);
            //   Alert.alert(messageRegisterUser);
            //   console.log(messageRegisterUser);
            //   setValues({});
            //   setChecked(false)
            let response = await loginUser(values);
            if(response?.user) {
               navigation.navigate('MyTab', { data: response });
            }
            else {
                Alert.alert(response?.showMessages);
            }
         //   navigation.navigate('MyTab');
        } catch (error) {
            console.log('error :>> ', error);
        }
    };

    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }));
    };

    const onBack = () => {
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <AuthHeader onBackPress={onBack} title='Đăng nhập' />
                <Input value={values?.userName} onChangeText={v => onChange('userName', v)} label='Tài khoản' placeholder='example@gmail.com' />
                <Input value={values?.passWord} onChangeText={v => onChange('passWord', v)} isPassword label='Mật khẩu' placeholder='*******' />

                <Button onPress={onLogin} style={styles.button} title='Đăng nhập' />

                <Separator text='Hoặc đăng nhập với' />

                <GoogleLogin />

                <Text style={styles.footerText}>
                    Bạn đã có tài khoản chưa?
                    <Text onPress={onSignUp} style={styles.footerLink}> Đăng ký</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default React.memo(Login);