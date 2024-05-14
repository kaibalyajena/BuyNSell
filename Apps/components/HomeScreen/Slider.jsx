import { View, Text, FlatList,Image} from 'react-native'
import React from 'react'

export default function Slider({sliderList}) {
  return (
    <View>
        <FlatList 
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>{
            console.log(index)
            console.log(item.image)
            return (
                <View >
                    <Image source={{uri:item.image}} className="w-[330px] h-[170px] object-contain rounded-lg mr-5 mt-5"/>
                </View>
            )
        
        }}>
        </FlatList>
    </View>
  )
}