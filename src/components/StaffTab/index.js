import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStaff from '../../app/HomeStaff';
import ViewService from '../../app/ViewService';
import Profile from '../../app/Profile';
const Tabs = createBottomTabNavigator();

const StaffTab = ({ route }) => {
  const dataLogin = route?.params?.data;
  console.log('đây là nhân viên');
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Đơn đăng ký dịch vụ" component={HomeStaff} options={{
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <Image
          source={focused ? require('../../images/tabs/home_active.png') : require('../../images/tabs/home.png')}
            style={{ width: 24, height: 24 }}
          />
        ),
      }} 
      initialParams={{ data: dataLogin}}
      />
      <Tabs.Screen name="Quản lý dịch vụ" component={ViewService} options={{
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <Image
            source={focused ? require('../../images/tabs/bookmark_active.png') : require('../../images/tabs/bookmark.png')}
            style={{ width: 24, height: 24 }}
          />
        ),
      }} 
      initialParams={{ data: dataLogin?.user?.staffId }}
      />

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
        initialParams={{ data: dataLogin.user }}   
      />
    </Tabs.Navigator>
  );
};

export default React.memo(StaffTab);