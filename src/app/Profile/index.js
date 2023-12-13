import React, { useContext, useState,useEffect  } from 'react';
import { Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header'; 

import ListItem from '../../components/ListItem';
import EditableBox from '../../components/EditableBox';
import Button from '../../components/Button';
import {updateUser} from '../../utils/backendCallAPIs';

// import { getProfile } from '../../../utils/backendCalls';
// import { ProfileContext } from '../../../../App';

const Profile = ({ route }) => {
    const [editing, setEditing] = useState(false);
    const [user, setValues] = React.useState(null);
    useEffect(() => {
        setValues(route.params?.data);
    }, [route.params?.data]);

    const onLogout = () => {
        navigation.navigate('Login');
    };
    const onEditPress = () => {
        setEditing(!editing);
    };

    const onSave = async () => {
        const result = await updateUser(user.userId,user);
        if(result){
            console.log('cập nhật oke rồi nè')
        }
        setEditing(!editing);
    };
    const onItemPress = () => {
        Linking.openURL('https://google.com');
    };
    const onChange = (key, value) => {
        setValues(v => ({ ...v, [key]: value }));
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
                <EditableBox label='Họ' onChangeText={v => onChange('lastName', v)} value={user?.lastName} editable={editing} 
                
                 />
                 <EditableBox label='Tên' onChangeText={v => onChange('firstName', v)} value={user?.firstName} editable={editing} 
                
                />
                <EditableBox label='Email' onChangeText={v => onChange('email', v)} value={user?.email} 
                editable={editing} 
                 />
                {editing ? (
                    <Button style={styles.button} onPress={onSave} title='Lưu thông tin' />
                ) : null}

                <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Trung tâm hỗ trợ</Text>
                <ListItem onPress={onItemPress} style={styles.item} title='FAQ' />
                <ListItem onPress={onItemPress} style={styles.item} title='Liên hệ với chúng tôi' />
                <ListItem onPress={onItemPress} style={styles.item} title='Quyền riêng tư & Điều khoản' />
            </ScrollView>
            {/* <Button  onPress={onLogout}  style={styles.buttonLogout} title='Đăng xuất' /> */}
        </SafeAreaView>
    );
};

export default React.memo(Profile);