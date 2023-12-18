import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { services } from '../../data/services';
import ServiceHomeItem from '../../components/ServiceHomeItem';
import Header from '../../components/Header'; 

const Home = ({ route ,navigation }) => {
    const [keyword, setKeyword] = useState();
    const [filteredServices, setFilteredServices] = useState(route.params?.data?.services);
    const [services, setServices] = useState(route.params?.data?.services);
    const [userID, setUserID] = useState(route.params?.data?.user?.userId);
    const [readonly, setReadonly] = useState(true);
    useEffect(() => {
        if(keyword?.trim()) {
            const searchService = services.filter(x => x?.serviceName?.trim()?.toLowerCase().includes(keyword?.trim()?.toLowerCase()));
            setFilteredServices(searchService);
        }
        else {
            setFilteredServices(services);
        }

    }, [keyword, services]);
    const renderServiceItem = ({ item }) => {
        const onServicePress = (Service) => {
            navigation.navigate('Detail', { Service,userID,readonly });
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
                data = {filteredServices}
                renderItem={renderServiceItem}
                keyExtractor={item => String(item?.serviceId)}
                ListFooterComponent={<View style={{ height: 200 }} />}
            />
        </SafeAreaView>
    );
};

export default React.memo(Home);