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
  TextInput,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { postService } from '../../utils/backendCallAPIs';

const PopupService = ({route, navigation}) => {
  // const [images, setImages] = useState([]);
  const [values, setValues] = useState({});
  const [userID, setUserID] = useState(route.params?.data);
  const goBack = () => {
    navigation.goBack();
  };

  const onChange = (value, key) => {
    setValues(val => ({...val, [key]: value}));
  };

  const [startHour, setStartHour] = useState(Number);
  const [startMinutes, setStartMinutes] = useState(Number);
  const [endHour, setEndHour] = useState(Number);
  const [endMinutes, setEndMinutes] = useState(Number);

  const isValidTime = (hour, minutes) => {
    const isValidHour = /^([0-1]?[0-9]|2[0-3])$/.test(hour);
    const isValidMinutes = /^[0-5]?[0-9]$/.test(minutes);
    return isValidHour && isValidMinutes;
  };
  const isValidTimeRange = () => {
    const startTimeInMinutes = parseInt(startHour) * 60 + parseInt(startMinutes);
    const endTimeInMinutes = parseInt(endHour) * 60 + parseInt(endMinutes);
  return startTimeInMinutes < endTimeInMinutes;
  };
  
  
  const handleStartHourChange = text => {
    if (text === '' || isValidTime(text, startMinutes)) {
      setStartHour(text);
    } else {
      setStartHour(0);
    }
  };

  const handleStartMinutesChange = text => {
    if (text === '' || isValidTime(startHour, text)) {
      setStartMinutes(text);
    } else {
      setStartMinutes(0);
    }
  };

  const handleEndHourChange = text => {
    if (text === '' || isValidTime(text, endMinutes)) {
      setEndHour(text);
    } else {
      setEndHour(0);
    }
  };

  const handleEndMinutesChange = text => {
    if (text === '' || isValidTime(endHour, text)) {
      setEndMinutes(text);
    } else {
      setEndMinutes(0);
    }
  };

  const onSubmit = async () => {
    if (!values?.serviceName) {
      Alert.alert('Thêm dịch vụ không được phép bỏ trống');
      return;
    }
    if (!values?.price) {
      Alert.alert('Giá dịch vụ không được phép bỏ trống');
      return;
    }
    if (!startHour || !startMinutes || !endHour || !endMinutes) {
      Alert.alert('Thời gian hoạt động dịch vụ không được phép bỏ trống');
      return;
    }
    
    if(!isValidTimeRange() ) {
        Alert.alert('Thời gian bắt đầu không được phép lớn hơn thời gian kết thúc');
        return;
    }
    if (!values?.address) {
      Alert.alert('Địa chỉ khám sức khỏe');
      return;
    }
    values.staffId = userID;
    values.startHours = startHour;
    values.startMinitues = startMinutes;
    values.endHours = endHour;
    values.endMinitues = endMinutes;
    console.log(values);
    const data = await postService(values);
    if (data) {
      Alert.alert('Thêm dịch vụ thành công');
      setValues({});
      setEndHour(Number);
      setEndMinutes(Number);
      setStartHour(Number);
      setStartMinutes(Number);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header showBack={true} onBackPress={goBack} title="Thông tin dịch vụ" />
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Input
            placeholder="Tên dịch vụ"
            label="Tên dịch vụ"
            value={values?.serviceName}
            onChangeText={v => onChange(v, 'serviceName')}
          />
          <Input
            placeholder="Giá dịch vụ"
            label="Giá dịch vụ"
            value={values?.price}
            onChangeText={v => onChange(v, 'price')}
            keyboardType="numeric"
          />

          <View style={styles.containerTime}>
            <View style={styles.rowTime}>
              <Text style={styles.labelTime}>Bắt đầu:</Text>
              <TextInput
                style={styles.inputTime}
                placeholder="HH"
                keyboardType="numeric"
                onChangeText={handleStartHourChange}
                value={startHour}
                maxLength={2}
              />
              <Text style={styles.separatorTime}>:</Text>
              <TextInput
                style={styles.inputTime}
                placeholder="mm"
                keyboardType="numeric"
                onChangeText={handleStartMinutesChange}
                value={startMinutes}
                maxLength={2}
              />

              <Text style={styles.labelTime}>Kết thúc:</Text>
              <TextInput
                style={styles.inputTime}
                placeholder="HH"
                keyboardType="numeric"
                onChangeText={handleEndHourChange}
                value={endHour}
                maxLength={2}
              />
              <Text style={styles.separatorTime}>:</Text>
              <TextInput
                style={styles.inputTime}
                placeholder="mm"
                keyboardType="numeric"
                onChangeText={handleEndMinutesChange}
                value={endMinutes}
                maxLength={2}
              />
            </View>
          </View>

          <Input
            placeholder="Nhập địa chỉ dịch vụ"
            label="Địa chỉ dịch vụ"
            value={values?.address}
            onChangeText={v => onChange(v, 'address')}
          />
          <Input
            style={styles.textarea}
            placeholder="Mô tả dịch vụ.."
            label="Mô tả dịch vụ"
            value={values.description}
            onChangeText={v => onChange(v, 'description')}
            multiline
          />
        </KeyboardAvoidingView>

        <Button
          onPress={onSubmit}
          title="Lưu thông tin"
          style={styles.button}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(PopupService);
