import { View, Text, TextInput,Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function Header() {
    const {user}=useUser() 
  return (
    <View className='mt-5'>
    <View className="flex flex-row item-center gap-2 mb-6">
        <Image source={{uri:user?.imageUrl}} 
        className="rounded-full w-10 h-10"/>
        <View>
            <Text className="text-[16px]">Welcome</Text>
            <Text className="text-[20px] font-bold">{user?.fullName}</Text>
        </View>
    </View>
    <View>
        <TextInput placeholder='Search' className="border-2 border-gray-400 rounded-full p-4 w-full bg-blue-100"
        onChangeText={(e)=>console.log(e)}/>
    </View>
    </View>
  )
}