import React from 'react';
import { Pressable, Text, Image } from 'react-native';
import Config from 'react-native-config';
import styles from './styles';

const ServiceHomeItem = ({ serviceName, price, image, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image style={styles.image}    source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} />
            <Text style={styles?.title}>{serviceName}</Text>
            <Text style={styles.price}>{price.toLocaleString('en-US')} VNĐ</Text>
        </Pressable>
    );
};

export default React.memo(ServiceHomeItem);