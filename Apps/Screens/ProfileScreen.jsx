import { View, Text ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '@clerk/clerk-expo'

export default function ProfileScreen() {
  const navigation=useNavigation()
  const {user}=useUser()
  const { isLoaded,signOut } = useAuth();
  const menuList=[{id:1,name:"my products",icon:''},{id:2,name:"logout",icon:''}]
  return (
    <View>
    <View className="items-center mt-20">
      <Image source={{uri:user.imageUrl}} className='w-[100px] h-[100px] rounded-full'></Image>
    </View>
    <View className="items-center mt-2">
      <Text className='text-[20px] font-bold'>{user.fullName}</Text>
      <Text className='text-[15px] text-slate-600'>{user.primaryEmailAddress.emailAddress}</Text>
    </View>
    <View className='flex'>
      <TouchableOpacity className='bg-blue-400 p-3 mt-3 rounded-lg pb-10 pt-10 m-20'><Text className='text-white text-center text-[30px]' onPress={()=>navigation.navigate('my-products')}>my products</Text></TouchableOpacity>
      <TouchableOpacity className='bg-blue-600 p-3 mt-3 rounded-full m-5' onPress={()=>signOut()}><Text className='text-white text-center'>logout</Text></TouchableOpacity>
    </View>
    </View>
  )
}