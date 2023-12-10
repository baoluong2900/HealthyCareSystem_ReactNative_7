import React, { useContext, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import styles from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Separator from '../../components/Separator';
import GoogleLogin from '../../components/GoogleLogin';
import { SafeAreaView } from 'react-native-safe-area-context';


const Login = ({ navigation }) => {
    const [values, setValues] = useState({});
    // const { setUser } = useContext(UserContext);

    const onSignUp = () => {
        navigation.navigate('Signup');
    };

    // const onBack = () => {
    //     navigation.goBack();
    // };

    // const onChange = (key, value) => {
    //     setValues(v => ({ ...v, [key]: value }));
    // };

    // const onSubmit = async () => {
    //     const token = await login(values);

    //     setUser({ token });
    // };
    const onBack = () => {
        navigation.goBack();
    };

    const onAppUser = () => {
        navigation.navigate('MyTab');
    };


    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                 <AuthHeader onBackPress={onBack}  title='Đăng nhập' /> 

                <Input value={values.email} onChangeText={v => onChange('email', v)} label='Email' placeholder='example@gmail.com' />
                <Input value={values.password} onChangeText={v => onChange('password', v)} isPassword label='Mật khẩu' placeholder='*******' />

                <Button  onPress={onAppUser}  style={styles.button} title='Đăng nhập' />

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