import React, {useContext, useState} from 'react';
import {ScrollView, Text, Image, View, Pressable, Linking} from 'react-native';
import styles from './styles';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/Button';
import {Rating} from 'react-native-ratings';

const ServiceDetails = ({route, navigation}) => {
  const [services, setServices] = useState(route?.params?.Service);
  const [userID, setUserID] = useState(route.params?.userID);
  const [readonly, setReadonly] = useState(route.params?.readonly);
  console.log(readonly);
  const onBackPress = () => {
    navigation.goBack();
  };

  const onContact = () => {
    const phone = '01234567891';
    Linking.openURL(`tel:${phone}`);
  };

  const onOpenForm = async () => {
    navigation.navigate('PopupAdd', {services, userID});
  };
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        {/* {services?.images?.length ? (
                    <ImageCarousel images={product?.images} />
                ) : (
                    <Image style={styles.image} source={{ uri: `${Config.API_BASE_URL}/${product?.image?.path}` }} />
                )} */}
        <Image
          style={styles.image}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />

        <View style={styles.content}>
          <Rating
            showRating={false}
            imageSize={15}
            startingValue={5}
            style={styles.rating}
            readonly={true}
          />
          <Text style={styles.title}> {services?.serviceName}</Text>
          <Text style={styles.description}>{services?.address}</Text>
          <Text style={styles.description}>{services?.price.toLocaleString('en-US')} VNĐ</Text>
          <Text style={styles.description}>
            {'Làm việc: từ ' +
              services?.startHours.toString() +
              ':' +
              services?.startMinitues.toString() +
              ' đến ' +
              services?.endHours.toString() +
              ':' +
              services?.endMinitues.toString()}
          </Text>
          <Text style={styles.title}>{'Mô tả dịch vụ:'}</Text>
          <Text style={styles.description}>{services?.description}</Text>
        </View>
        <Pressable onPress={onBackPress} style={styles.backContainer}>
          <Image
            style={styles.backIcon}
            source={require('../../images/back.png')}
          />
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        {readonly ? (
          <Pressable onPress={onOpenForm} style={styles.bookmarkContainer}>
            <Image
              style={styles.bookmarkIcon}
              source={require('../../images/bookmark_filled.png')}
            />
          </Pressable>
        ) : null}
        {readonly ? (
          <View style={styles.viewButton}>
            <Button onPress={onContact} title="Liên hệ ngay" />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(ServiceDetails);
