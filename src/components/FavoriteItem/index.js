import React, {useState} from 'react';
import {Pressable, Text, View, Image} from 'react-native';
import {styles} from './styles';
import {statusCbx} from '../../data/categories';
const FavoriteItem = ({
  title,
  price,
  icon,
  image,
  date,
  status,
  onPress,
  onIconPress,
}) => {
  const filteredStatus = statusCbx.filter(x => x.id === status);
  const defaultStatusName =
    filteredStatus.length > 0 ? filteredStatus[0].title : 'Default Status Name';
  const [statusName, setStatusName] = useState(defaultStatusName);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* <Image style={styles.image} source={{ uri: `${Config.API_BASE_URL}/${image?.path}` }} /> */}
      <Image
        style={styles.image}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{'Tổng tiền: ' + price}</Text>
        <View style={styles.rowEnd}>
           <Text style={styles.price}>{date}</Text>
          <Text style={styles.status}>{statusName}</Text>
        </View>
      </View>

      <Pressable onPress={onIconPress}>
        <Image
          source={icon || require('../../images/close.png')}
          style={styles.icon}
        />
      </Pressable>
    </Pressable>
  );
};

export default React.memo(FavoriteItem);
