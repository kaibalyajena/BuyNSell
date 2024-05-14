import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { app } from '../../firebaseConfig'
import { getFirestore,collection,query,getDocs,where} from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import LatestItemList from '../components/HomeScreen/LatestItemList'
import { useNavigation } from '@react-navigation/native'

export default function MyProducts() {
    const db=getFirestore(app)
    const {user}=useUser()
    const [userPosts, setUserPosts] = useState([])
    const navigation=useNavigation()
    useEffect(()=>{
        getUserPosts()
    },[user])
    useEffect(()=>{
        navigation.addListener('focus',(e)=>{
            getUserPosts()
        })
    },[navigation])
    const getUserPosts=async()=>{
        setUserPosts([])
        const q=query(collection(db,'UserPost'),where('userEmail','==',user.primaryEmailAddress.emailAddress))
        const snapshot=await getDocs(q)
        snapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserPosts(userPosts=>[...userPosts,doc.data()])
        });
    }

  return (
    <View>
        <LatestItemList latestItemList={userPosts} heading=""></LatestItemList>
    </View>
  )
}