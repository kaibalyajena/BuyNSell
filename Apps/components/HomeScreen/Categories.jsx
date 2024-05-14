import { View, Text, FlatList,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Categories({categoryList}) {
    console.log(categoryList)
    const navigation=useNavigation()
  return (
    <View className='mt-3'>
      <Text className="font-bold text-[20px] mb-1">Categories</Text>
      <FlatList
      data={categoryList}
      numColumns={4}
      renderItem={({item,index})=>(
        <TouchableOpacity className='flex-1 items-center justify-center m-1 border-[1px] rounded-lg p-2 bg-blue-100' onPress={()=>navigation.navigate('item-list',{category:item.name})}>
            <Image source={{uri:item.icon}} className="w-[55px] h-[55px]" />
            <Text className='text-[11px]'>{item.name}</Text>
        </TouchableOpacity>
      )}>

      </FlatList>
    </View>
  )
}