import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { services } from '../../data/services';
import ServiceHomeItem from '../../components/ServiceHomeItem';
import Header from '../../components/Header'; 

const Home = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [keyword, setKeyword] = useState();
    // const [filteredServices, setFilteredServices] = useState(services);
    // const { services, setServices } = useContext(ServicesContext);

    useEffect(() => {
        (async () => {
            const data = services;
          //  setServices(data);
        })();
    }, []);

    // useEffect(() => {
    //     if (selectedCategory && !keyword) {
    //         const updatedServices = services.filter(service => String(service?.category) === String(selectedCategory));
    //         setFilteredServices(updatedServices);
    //     } else if (selectedCategory && keyword) {
    //         const updatedServices = services.filter(service => String(service?.category) === String(selectedCategory) && service?.title?.toLowerCase().includes(keyword?.toLowerCase()));
    //         setFilteredServices(updatedServices);
    //     } else if (!selectedCategory && keyword) {
    //         const updatedServices = services.filter(service => service?.title?.toLowerCase().includes(keyword?.toLowerCase()));
    //         setFilteredServices(updatedServices);
    //     } else if (!keyword && !selectedCategory) {
    //         setFilteredServices(services);
    //     }
    // }, [selectedCategory, keyword, services]);

    // const renderCategoryItem = ({ item, index }) => {
    //     return (
    //         <CategoryBox
    //             onPress={() => setSelectedCategory(item?.id)}
    //             isSelected={item?.id === selectedCategory}
    //             isFirst={index === 0}
    //             title={item?.title}
    //             image={item?.image}
    //         />
    //     );
    // };

    const renderServiceItem = ({ item }) => {
        const onServicePress = (Service) => {
            navigation.navigate('ServiceDetails', { Service });
        };

        return (
            <ServiceHomeItem onPress={() => onServicePress(item)} {...item} />
        );
    };

    return (
        <SafeAreaView>
            <Header showSearch onSearch={setKeyword} keyword={keyword} title='Tìm kiếm dịch vụ' />


            <FlatList
                style={styles.servicesList}
                numColumns={2}
              //  data={filteredServices}
                data = {services}
                renderItem={renderServiceItem}
                keyExtractor={item => String(item._id)}
                ListFooterComponent={<View style={{ height: 200 }} />}
            />
        </SafeAreaView>
    );
};

export default React.memo(Home);