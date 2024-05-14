import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import ProfileStackNav from './ProfileStackNav';

const Tab = createBottomTabNavigator();


export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,tabBarActiveTintColor:"black"}}>

      <Tab.Screen name="home" component={HomeScreenStackNav} 
      options={{tabBarLabel:({color})=>(<Text style={{color:color}}>Home</Text>),
      tabBarIcon:({color,size})=>(<AntDesign name="home" size={size} color={color} />)}}/>

      <Tab.Screen name="explore" component={ExploreScreen} 
      options={{tabBarLabel:({color})=>(<Text style={{color:color}}>Search</Text>),
      tabBarIcon:({color,size})=>(<AntDesign name="search1" size={size} color={color} />)}}/>

      <Tab.Screen name="add post" component={AddPostScreen} 
      options={{tabBarLabel:({color})=>(<Text style={{color:color}}>Add post</Text>),
      tabBarIcon:({color,size})=>(<AntDesign name="addfile" size={size} color={color} />)}}/>

      <Tab.Screen name="profile" component={ProfileStackNav} 
      options={{tabBarLabel:({color})=>(<Text style={{color:color}}>Profile</Text>),
      tabBarIcon:({color,size})=>(<AntDesign name="user" size={size} color={color} />)}}/>

    </Tab.Navigator>
  )
}