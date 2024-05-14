import { View, Text, FlatList,Image,ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import PostItem from './PostItem'

export default function LatestItemList({latestItemList,heading}) {
  return (
    <View className='mt-3 mb-10'>
        <Text className='font-bold text-[20px]'>{heading}</Text>
        <FlatList
        numColumns={2}
            data={latestItemList}
            renderItem={({item,index})=>(
                <PostItem item={item}/>
            )}>
        </FlatList>
    </View>
  )
}