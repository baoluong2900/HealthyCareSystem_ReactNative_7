import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../app/Home';
import MyListings from '../../app/MyListings';
import Profile from '../../app/Profile';
const Tabs = createBottomTabNavigator();

const MyTab = ({ route }) => {

  const user = route?.params?.data;

  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Trang chủ" component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <Image
            source={focused ? require('../../images/tabs/home_active.png') : require('../../images/tabs/home.png')}
            style={{ width: 24, height: 24 }}
          />
        ),
      }} />

      <Tabs.Screen name="Danh sách đăng ký" component={MyListings} options={{
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <Image
            source={focused ? require('../../images/tabs/bookmark_active.png') : require('../../images/tabs/bookmark.png')}
            style={{ width: 24, height: 24 }}
          />
        ),
      }} />

      <Tabs.Screen
        name="Hồ sơ"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={focused ? require('../../images/tabs/profile_active.png') : require('../../images/tabs/profile.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
        initialParams={{ data: user }}
      />
    </Tabs.Navigator>
  );
};

export default React.memo(MyTab);