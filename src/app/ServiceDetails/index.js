import React, { useContext,useState } from 'react';
import { ScrollView, Text, Image, View, Pressable, Linking } from 'react-native';
import styles from './styles';
import Config from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { Rating, AirbnbRating } from 'react-native-ratings';
// import { updateService } from '/src/utils/backendCalls';
// import { ServicesContext } from '/App';

const ServiceDetails = ({ route, navigation }) => {
    // const params = route?.params || {};
    // const { services, setServices } = useContext(ServicesContext);
    // const product = services?.find(service => service?._id === params?.product?._id);
    console.log(route?.params);
    const [services, setServices] = useState(route?.params?.Service);
    const onBackPress = () => {
        navigation.goBack();
    };

    const onContact = () => {
        const phone = '01234567891';
        Linking.openURL(`tel:${phone}`);
    };

    const onBookmark = async () => {
        // const data = await updateService(product?._id, { liked: true });
        // setServices(data);
    };
    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container}>
                {/* {services?.images?.length ? (
                    <ImageCarousel images={product?.images} />
                ) : (
                    <Image style={styles.image} source={{ uri: `${Config.API_BASE_URL}/${product?.image?.path}` }} />
                )} */}
                <Image style={styles.image}    source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} />
        
 <View style={styles.content}>
    <Rating
  showRating={false}
  imageSize={15}
  startingValue={5 / 3}
  style={styles.rating}
  readonly={true}
/> 
                    <Text style={styles.title}> {services?.serviceName}</Text>
                    <Text style={styles.price}>$ {services?.price}</Text>
                    <Text style={styles.description}>{services?.description}</Text>
                </View>
                <Pressable onPress={onBackPress} style={styles.backContainer}>
                    <Image style={styles.backIcon} source={require('../../images/back.png')} />
                </Pressable>


            </ScrollView>

            <View style={styles.footer}>
                <Pressable onPress={onBookmark} style={styles.bookmarkContainer}>
                    <Image style={styles.bookmarkIcon} source={require('../../images/bookmark_filled.png')} />
                </Pressable>
                <View style={styles?.viewButton}>
                    <Button onPress={onContact} title="Liên hệ ngay" />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default React.memo(ServiceDetails);