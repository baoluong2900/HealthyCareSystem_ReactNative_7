import React, {useContext, useState, useEffect} from 'react';
import {FlatList, Text, View, Alert,TouchableOpacity } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
// import { ProfileContext, ServicesContext } from '../../../../App';
import {getAppointmentByUserID,deleteAppointmentByUserID} from '../../utils/backendCallAPIs';
import FavoriteItem from '../../components/FavoriteItem';
import {styles} from './styles';
import { useFocusEffect } from '@react-navigation/native';

const getListAppointment = async userID => {
  try {
    const result = await getAppointmentByUserID(userID);
    if (result) {
      return result;
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }
};

const AcceptAccount = ({route, navigation}) => {
  const [userID, setUserID] = useState(route?.params?.data);
  const [appointments, setAppointments] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const appointmentData = await getListAppointment(userID);
          if (appointmentData) {
            setAppointments(appointmentData);
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchData();
    }, [userID])
  );


  const renderItem = ({item}) => {
    // const onProductPress = () => {
    //     navigation.navigate('ServiceDetails', { service: item });
    // };
    const onRemove = async () => {
      Alert.alert('Bạn có muốn xóa đăng ký dịch vụ này không', 'Xác nhận xóa', [
        {
          text: 'Không',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {text: 'Có', onPress: async () =>  {
          console.log(item.appointmentId);
          //  const data = await deleteAppointmentByUserID();
          const isDelete = await deleteAppointmentByUserID(item.appointmentId);
          console.log(isDelete);
          if(isDelete) {
            const data = appointments.filter(x=> x.appointmentId!== 9);
            setAppointments(data);
            Alert.alert('Hủy dịch vụ thành công');
          }
        }},
      ]);
    };
    return (
      <FavoriteItem
        onIconPress={onRemove}
        icon={require('../../images/delete.png')}
        {...item}
      />
    );
  };
  const goBack = () => navigation.goBack();
  return (
    <SafeAreaView style={styles.background}>
      <Header
        title="Danh sách dịch vụ đã đăng ký"
        showBack
        onBackPress={goBack}
      />
      <FlatList
        data={appointments}
        keyExtractor={item => item.appointmentId.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default React.memo(AcceptAccount);
