import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import MyProducts from '../Screens/MyProducts';
import ProductDetail from '../Screens/ProductDetail';
const Stack = createStackNavigator();
export default function ProfileStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="profile-tab" component={ProfileScreen} options={{headerShown:false}}/>
      <Stack.Screen name="my-products" component={MyProducts}/>
      <Stack.Screen name="product-detail" component={ProductDetail}/>
    </Stack.Navigator>
  )
}