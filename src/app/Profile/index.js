import React, { useContext, useState } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header'; 

import ListItem from '../../components/ListItem';
import EditableBox from '../../components/EditableBox';
import Button from '../../components/Button';

// import { getProfile } from '../../../utils/backendCalls';
// import { ProfileContext } from '../../../../App';

const Profile = ({ navigation }) => {
    // const num = 10;
    // const { profile, setProfile } = useContext(ProfileContext);
    // const [editing, setEditing] = useState(false);
    let values = null;
    // useEffect(() => {
    //     (async () => {
    //         const data = await getProfile();

    //         setProfile(data);
    //     })();
    // }, []);

     const onLogout = () => {
        console.log('hello')
        navigation.navigate('Login');
    };
    const onEditPress = () => {
        // setEditing(true);
    };
    let editing = false;

    const onSave = async () => {
        // const updatedProfile = await updateProfile(values);
        // setProfile(updatedProfile);
        // setEditing(false);
    };
    const onItemPress = () => {
        Linking.openURL('https://google.com');
    };
    const onChange = (key, value) => {
        // setValues(v => ({ ...v, [key]: value }));
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title='Hồ sơ' />
            <ScrollView style={styles.container}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Thông tin cá giúp nhân</Text>
                    <Pressable onPress={onEditPress}>
                        <Image style={styles.icon} source={require('../../images/edit.png')} />
                    </Pressable>
                </View>
                <EditableBox label='Họ và tên' onChangeText={v => onChange('fullName', v)} value={'hello'}  />
                <EditableBox label='Email' onChangeText={v => onChange('email', v)} value={'hello@gmail.com'}  />
                {editing ? (
                    <Button style={styles.button} onPress={onSave} title='Save' />
                ) : null}

                <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Trung tâm hỗ trợ</Text>
                <ListItem onPress={onItemPress} style={styles.item} title='FAQ' />
                <ListItem onPress={onItemPress} style={styles.item} title='Liên hệ với chúng tôi' />
                <ListItem onPress={onItemPress} style={styles.item} title='Quyền riêng tư & Điều khoản' />
            </ScrollView>
            <Button  onPress={onLogout}  style={styles.buttonLogout} title='Đăng xuất' />
        </SafeAreaView>
    );
};

export default React.memo(Profile);