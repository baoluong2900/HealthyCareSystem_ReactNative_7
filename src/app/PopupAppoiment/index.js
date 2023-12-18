import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import {launchImageLibrary} from 'react-native-image-picker';
import Input from '../../components/Input';
import Button from '../../components/Button';
// import DatePicker from 'react-native-date-picker'
// import { addService } from '../../../utils/backendCalls';
import DateTimePicker from '@react-native-community/datetimepicker';
import { paymenths } from '../../data/categories';
import { addAppointment } from '../../utils/backendCallAPIs';

const PopupAppoiment = ({route, navigation}) => {
  // const [images, setImages] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  // const { setServices } = useContext(ServicesContext);
  const [userID, setUserID] = useState(route.params?.userID);
  const [service, setService] = useState(route.params?.services);
  const goBack = () => {
    navigation.goBack();
  };

  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState({});
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDateTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios' ? true : false); // Show the picker only if it's confirmed on iOS
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  const isAfterToday =(date) => {
    return new Date(date) > new Date();
  }
  const onChange = (value, key) => {
    setValues(val => ({...val, [key]: value}));
  };
  const onChangeCbx = (value, key) => {
    setCategory(val => ({...val, [key]: value}));
  };

  const onSubmit = async () => {
    if(!values?.address){
        Alert.alert('Địa chỉ khám sức khỏe');
        return;
    }
    if(date.getDate() < new Date().getDate()) {
        Alert.alert('Ngày khám bệnh phải hớn ngày hiện tại');
        return;
    }
    if(!category){
        Alert.alert('Phương thức thanh toán không được phép bỏ trống');
        return;
    }
    values.userId = userID;
    values.serviceId = service.serviceId
    values.price = service.price
    values.appointmentTime =date;
    values.payment = category?.data?.id.toString();
    const data = await addAppointment(values);
    if(data) {
        Alert.alert('Đăng ký dịch vụ thành công');
        setValues({});
        setCategory({});
        setDate(new Date());
    }

    //   Alert.alert(user.showMessages);
    //   if(user.isError) {
    //     setValues({});
    //     setChecked(false)
    //   }

    // navigation.navigate('PopupAdd');
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header
        showBack={true}
        onBackPress={goBack}
        title="Đăng ký dịch vụ khám sức khỏe"
      />

      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          {/* <Text style={styles.sectionTitle}>Upload Photos</Text> */}

          {/* <View style={styles.imageRow}>
                        <TouchableOpacity disabled={loading} style={styles.uploadContainer} onPress={uploadNewImage}>
                            <View style={styles.uploadCircle}>
                                <Text style={styles.uploadPlus}>+</Text>
                            </View>
                        </TouchableOpacity>

                        {images?.map(image => (
                            <View style={styles.imageCont} key={image?.fileName}>
                                <Image style={styles.image} source={{ uri: image?.uri }} />
                                <Pressable hitSlop={20} onPress={() => onDeleteImage(image)}>
                                    <Image style={styles.delete} source={require('../../../assets/close.png')} />
                                </Pressable>
                            </View>
                        ))}

                        {loading ? (
                            <ActivityIndicator />
                        ) : null}
                    </View> */}

          <Input
            placeholder="Tên dịch vụ"
            label="Tên dịch vụ"
            value={service?.serviceName}
            editable={false}
          />
                    <Input
            placeholder="Giá dịch vụ"
            label="Giá dịch vụ"
            value={service?.price.toString()}
            editable={false}
          />

<Input
            placeholder="Nhập địa chỉ sức khỏe"
            label="Địa chỉ khám sức khỏe"
            value={values?.address}
            onChangeText={v => onChange(v, 'address')}
          />

          {/* <Input placeholder='Select the category' label='Category' value={values.category} onChangeText={v => onChange(v, 'category')} type='picker' options={categories} /> */}
          <Input
            placeholder="Lịch hẹn sức khỏe"
            label="Lịch hẹn khám sức khỏe"
            value={date.toLocaleDateString('en-GB')}
            editable={false}
          />

          <Button
            onPress={showDatepicker}
            style={styles.buttonDateTime}
            title="Chọn ngày đăng ký lịch"
          />
          {showPicker && (
        
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDateTime}
          />
          )}
          <Input placeholder='Chọn phương thức thanh toán' label='Phương thức thanh toán' value={category.data} onChangeText={v => onChangeCbx(v,'data')} type='picker' options={paymenths} />
          <Input
            style={styles.textarea}
            placeholder="Mô tả ghi chú..."
            label="Ghi chú"
            value={values.description}
            onChangeText={v => onChange(v, 'description')}
            multiline
          />
        </KeyboardAvoidingView>

        <Button
          onPress={onSubmit}
          title="Đăng ký lịch hẹn"
          style={styles.button}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(PopupAppoiment);
