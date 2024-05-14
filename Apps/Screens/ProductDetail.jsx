import { View, Text,Image,ScrollView,TouchableOpacity, Linking,Alert} from 'react-native'
import React, { useEffect,useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../firebaseConfig';
import { collection, getFirestore,query,where,getDocs,deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetail() {
    const {user}=useUser()
    const {params}=useRoute()
    const [product, setProduct] = useState({})
    const db=getFirestore(app)
    const nav=useNavigation()
    useEffect(()=>{
        console.log(params)
        params&&setProduct(params.product)
    },[])
    const sendEmailMessage=()=>{
        const subject=`Interested in ${product.title}`
        const body=`Hi ${product.userName}, I am interested in your product ${product.title}.`
        Linking.openURL(`mailto:${product.userEmail}`+"?subject="+subject+"&body="+body)
    }
    const deletePost=()=>{
        Alert.alert(
            "Delete Post",
            "Are you sure you want to delete this post?",
            [
              { title: 'Yes', onPress: () => deleteFromFirebase(),text:'Yes' },
              { text: 'Cancel', onPress: () => console.log('No'),style:'cancel' }
            ]
          );
    }
    const deleteFromFirebase=async()=>{
        console.log("delete")
        const q=query(collection(db,'UserPost'),where('title','==',product.title))
        const snapshot=await getDocs(q)
        snapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            deleteDoc(doc.ref).then(resp=>{
                console.log(resp)
                nav.goBack()
            })
        });
    }
  return (
    <ScrollView>
        <Image source={{uri:product.image}} className='w-[100%] h-[300px]'/>
        <View>
            <Text className='text-[25px] font-bold mt-3'>{product.title}</Text>
            <View className='items-baseline mt-2 mb-3'>
            <Text className='text-[15px] ml-2 p-1 px-2 bg-blue-300 rounded-full'>{product.category}</Text>
            </View>
            
            <Text className='text-[20px] mt-2 ml-2 font-bold'>Description</Text>
            <Text className='text-[17px] mt-1 ml-2 text-slate-600'>{product.desc}</Text>
            <Text className='text-[25px] p-4 text-blue-600'>$ {product.price}</Text>
            
            
        </View>
        <View className='flex flex-row items-center gap-3 p-2'>
            <Image source={{uri:product.userImage}} className='w-[50px] h-[50px] rounded-full mt-3 ml-2'/>
            <View>
                <Text className='text-[20px] font-bold'>{product.userName}</Text>
                <Text className='text-[15px] text-slate-600'>{product.userEmail}</Text>
            </View>
        </View>
        {user.primaryEmailAddress.emailAddress==product.userEmail?<TouchableOpacity className='z-40 bg-red-400 p-3 ml-10 mr-10 mt-3 rounded-full' onPress={()=>deletePost()}>
            <Text className='text-center text-whit'>Delete Post</Text>
        </TouchableOpacity>:<TouchableOpacity className='z-40 bg-blue-500 p-3 ml-10 mr-10 mt-3 rounded-full' onPress={()=>sendEmailMessage()}>
            <Text className='text-center text-white'>Send Message</Text>
        </TouchableOpacity>}

    </ScrollView>
  )
}