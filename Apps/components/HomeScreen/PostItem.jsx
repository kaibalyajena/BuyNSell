import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function PostItem({item}) {
    const navigation=useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('product-detail',{product:item})} className='flex-1 m-2 border-[1px] rounded-lg p-2 border-slate-400 '>
        <Image source={{uri:item.image}} className='w-full h-[160px] object-cover'></Image>
                    <View className="">
                        <Text className='text-[10 px] mt-2'>{item.category}</Text>
                        <Text className='font-bold text-[15px] mt-1'>{item.title}</Text>
                        <Text className='text-[20px] mt-1 font-bold color-blue-600'>${item.price}</Text>
                    </View>
    </TouchableOpacity>
  )
}