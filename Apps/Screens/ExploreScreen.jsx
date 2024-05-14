import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { query } from 'firebase/firestore'
import { getFirestore, collection,getDocs } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from '../components/HomeScreen/LatestItemList'

export default function ExploreScreen() {
  const db=getFirestore(app)
  const [productList, setProductList] = useState([])
  useEffect(()=>{
    getAllProducts()
  },[])
    const getAllProducts=async()=>{
      setProductList([])
      const q=query(collection(db,'UserPost'))
      const snapshot=await getDocs(q)
      snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setProductList(productList=>[...productList,doc.data()])
      });
    }
    return (
      <View className="p-5 py-11">
        <Text className='text-[24px] font-bold'>Explore More</Text>
        <LatestItemList latestItemList={productList} heading={''}/>
      </View>
    )
  }
