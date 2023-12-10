import React, { useContext } from "react";
import { FlatList ,Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
// import { ProfileContext, ServicesContext } from '../../../../App';

import { services } from "../../data/services";
const MyListings = ({ navigation }) => {
  // const myServices = Array.isArray(services) ? services?.filter(service => service?.owner === profile?._id) : [];

  // const renderItem = ({ item }) => {
  //     const onProductPress = () => {
  //         navigation.navigate('ServiceDetails', { service: item });
  //     };
  //     const onRemove = async () => {
  //         const updatedServices = await deleteService(item?._id);
  //         setServices(updatedServices);
  //     };
  //     return (
  //         <FavoriteItem onIconPress={onRemove} icon={require('/src/images/delete.png')} onPress={onProductPress} {...item} />
  //     );
  // };
  const data = [
    { id: 1, name: "Item 1 123" },
    { id: 2, name: "Item 2" },
    // ...
  ];
  const goBack = () => navigation.goBack();
  return (
    <SafeAreaView>
      <Header
        title="Danh sách dịch vụ đã đăng ký"
        showBack
        onBackPress={goBack}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item?.name}</Text>}
      />
    </SafeAreaView>
  );
};

export default React.memo(MyListings);
