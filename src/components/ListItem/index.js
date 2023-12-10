import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import styles from './styles';

const ListItem = ({ title, subtitle, onPress, style }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                {Boolean(subtitle) ? (
                    <Text style={styles.subtitle}>{subtitle}</Text>
                ) : null}
            </View>
            <Image style={styles.arrow} source={require('../../images/arrow.png')} />
        </Pressable>
    );
};

export default React.memo(ListItem);