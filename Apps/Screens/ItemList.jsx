import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection } from 'firebase/firestore';
import {getFirestore,query,where,getDocs} from 'firebase/firestore'
import { app } from '../../firebaseConfig';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import LatestItemList from '../components/HomeScreen/LatestItemList';

export default function ItemList() {
    const {params}=useRoute();
    const db=getFirestore(app)
    const [itemList, setItemList] = useState([])
    useEffect(()=>{
        const category=params.category
        console.log(category)
        params&&getItemListByCategory({category})
    },[params])
    const getItemListByCategory=async(params)=>{
        setItemList([])
        const q=query(collection(db,'UserPost'),where('category','==',params.category))
        const querySnapshot=await getDocs(q)
        querySnapshot.forEach((doc) => {
            console.log("ItemList",doc.id, " => ", doc.data())
            setItemList(itemList=>[...itemList,doc.data()])
          });
    }
  return (
    <View>
        {itemList.length>0?<LatestItemList latestItemList={itemList} heading={''}/>:
        <Text className='text-[20px] text-slate-600 justify-center text-center mt-20'>No available listing</Text>}
        
    </View>
  )
}