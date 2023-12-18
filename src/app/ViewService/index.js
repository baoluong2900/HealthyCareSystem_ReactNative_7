import React, {useContext, useState, useEffect} from 'react';
import {FlatList, Text, View, Alert, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import Button from '../../components/Button';
// import { ProfileContext, ServicesContext } from '../../../../App';
import {
  getServiceByStaffID,
  deleteServiceByStaffID,
} from '../../utils/backendCallAPIs';

import FavoriteService from '../../components/FavoriteService';
import {styles} from './styles';
import {useFocusEffect} from '@react-navigation/native';

const getListService = async userID => {
  try {
    const result = await getServiceByStaffID(userID);
    if (result) {
      return result;
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }
};

const ViewService = ({route, navigation}) => {
  const [userID, setUserID] = useState(route?.params?.data);
  const [readonly, setReadonly] = useState(false);
  const [services, setService] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const serviceData = await getListService(userID);
          if (serviceData) {
            setService(serviceData);
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchData();
    }, [userID]),
  );

  const onNewService = () => {
    navigation.navigate('PopupService',{data: userID });
  };
  const renderServiceItem = ({ item }) => {

    const onServicePress = (Service) => {
        navigation.navigate('Detail', { Service,userID, readonly });
    };
    const onRemove = async () => {
        Alert.alert('Bạn có muốn xóa dịch vụ này không', 'Xác nhận xóa', [
          {
            text: 'Không',
            onPress: () => {
              return;
            },
            style: 'cancel',
          },
          {
            text: 'Có',
            onPress: async () => {
                console.log(item.serviceId);
                const isDelete = await deleteServiceByStaffID(item.serviceId);
                if(isDelete) {
                  const data = services.filter(x=> x.serviceId!== item.serviceId);
                  setService(data);
                  Alert.alert('Xóa thành công');
                }
            },
          },
        ]);
      };
      return (
        <FavoriteService
        onPress={() => onServicePress(item)} {...item}
          onIconPress={onRemove}
          icon={require('../../images/delete.png')}
          {...item}
        />
      );
};
  const goBack = () => navigation.goBack();
  return (
    <SafeAreaView style={styles.background}>
      <Header title="Danh sách dịch vụ" showBack onBackPress={goBack} />
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={item => item.serviceId.toString()}
      />
      <Button
        onPress={onNewService}
        style={{flex: 0}}
        title="Thêm mới dịch vụ"
      />
    </SafeAreaView>
  );
};

export default React.memo(ViewService);
