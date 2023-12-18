import React, {useState, useEffect, useContext} from 'react';
import {FlatList, View,Alert} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
// import { services } from '../../data/services';
import ServiceHomeItem from '../../components/ServiceHomeItem';
import Header from '../../components/Header';
import FavoriteItem from '../../components/FavoriteItem';
import Button from '../../components/Button';
import {statusCbx} from '../../data/categories';
import Input from '../../components/Input';
import { putAppointmentByUserID } from '../../utils/backendCallAPIs';
const HomeStaff = ({route, navigation}) => {
  const [keyword, setKeyword] = useState();
  const [appointments, setAppointments] = useState(
    route.params?.data?.appointments,
  );
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [userID, setUserID] = useState(route.params?.data?.user?.userId);
  const [category, setCategory] = useState({});
  const onChangeCbx = (value, key) => {
    setCategory(val => ({...val, [key]: value}));
  };
  useEffect(() => {
    if (keyword?.trim()) {
      const searchService = appointments.filter(x =>
        x?.title
          ?.trim()
          ?.toLowerCase()
          .includes(keyword?.trim()?.toLowerCase()),
      );
      setFilteredAppointments(searchService);
    } else {
      setFilteredAppointments(appointments);
    }
  }, [keyword, appointments]);
  const renderItem = ({item}) => {
    const onSave = async (item) => {    
        if(!category?.data) {
            Alert.alert('Vui lòng chọn trạng thái');
            return;
        }
        const status = category?.data.id;
        const isUpdate = await putAppointmentByUserID(item.appointmentId,status);
        if(isUpdate) {       
            Alert.alert('Cập nhật thành công');
              // Create a new array with the updated data
              const updatedArray = appointments.map((x) =>
                x.appointmentId === item.appointmentId ? { ...x, status: status } : x
              );
              setAppointments([]);
              setFilteredAppointments([]);
              setAppointments(updatedArray);
              setFilteredAppointments(appointments);

            setIsUpdate(false);
            setCategory({});
        }
    }
    const onEdit = item => {
      setIsUpdate(!isUpdate);
    };
    return (
      <SafeAreaView>
        <FavoriteItem
          onIconPress={() => onEdit(item)}
          icon={require('../../images/edit.png')}
          {...item}
        />

        {isUpdate ? (
          <Input
            placeholder="Cập nhật trạng thái"
            label="Trạng thái"
            value={category?.data}
            onChangeText={v => onChangeCbx(v, 'data')}
            type="picker"
            options={statusCbx}
          />
        ) : null}

        {isUpdate ? (
          <Button style={styles.button} onPress={() => onSave(item)} title="Cập nhật thông tin" />
        ) : null}
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView>
      <Header
        showSearch
        onSearch={setKeyword}
        keyword={keyword}
        title="Tìm kiếm đơn đăng ký dịch vụ"
      />
      {/* <FlatList
                style={styles.servicesList}
                numColumns={2}
                data = {filteredServices}
                renderItem={renderServiceItem}
                keyExtractor={item => String(item?.serviceId)}
                ListFooterComponent={<View style={{ height: 200 }} />}
            /> */}
      <FlatList
        data={filteredAppointments}
        keyExtractor={item => item.appointmentId.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default React.memo(HomeStaff);
