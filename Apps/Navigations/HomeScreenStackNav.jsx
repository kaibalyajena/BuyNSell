import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import ProductDetail from '../Screens/ProductDetail';

export default function HomeScreenStackNav() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="item-list" component={ItemList} 
        options={({route})=>({title:route.params.category})}/>
        <Stack.Screen name="product-detail" component={ProductDetail}/>
    </Stack.Navigator>
  )
}