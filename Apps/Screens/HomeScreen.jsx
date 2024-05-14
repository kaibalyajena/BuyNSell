import { View, Text ,ScrollView} from 'react-native'
import React, { useEffect,useState } from 'react'
import Header from '../components/HomeScreen/Header'
import Slider from '../components/HomeScreen/Slider'
import { getFirestore,collection, getDocs, query, orderBy} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import Categories from '../components/HomeScreen/Categories'
import LatestItemList from '../components/HomeScreen/LatestItemList'



export default function HomeScreen() {
  const db=getFirestore(app)
  const [sliderList, setSliderList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [latestItemList, setLatestItemList] = useState([])
  
  useEffect(()=>{
    getSliders()
    getCategoryList()
    getLatestItemList()
  },[])

  const getCategoryList = async () => {
    setCategoryList([]);
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setCategoryList(categoryList=>[...categoryList,doc.data()])
      });
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const getSliders=async()=>{
    setSliderList([])
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    setSliderList(sliderList=>[...sliderList,doc.data()])
});
  }

  const getLatestItemList=async()=>{
    setCategoryList([])
    const querySnapshot = await getDocs(collection(db, "UserPost"));
    querySnapshot.forEach((doc) => {
      console.log("Latest Item List",doc.id, " => ", doc.data())
      setLatestItemList(latestItemList=>[...latestItemList,doc.data()])
    })
  }


  return (
    <ScrollView className='py-8 px-6'>
      <Header />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <LatestItemList latestItemList={latestItemList} heading={"latest items"} />
    </ScrollView>
  )
}