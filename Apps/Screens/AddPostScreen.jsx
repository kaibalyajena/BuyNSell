import React, { useEffect,useState} from 'react';
import { View, Text,StyleSheet,TextInput, Button,TouchableOpacity,Image,ScrollView,KeyboardAvoidingView} from 'react-native';
import { getFirestore, getDocs, collection,addDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const storage = getStorage();
  const {user}=useUser();
  useEffect(() => {
    getCategoryList();
  }, []);

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


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value) => {
    // value.image = image;
    // console.log(value);
    try {
      // Convert the URI to a blob file
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, 'communityPost/' + new Date()+ '.jpg');
  
      // Await the completion of the upload
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then((resp)=>{
        getDownloadURL(storageRef).then(async(downloadUrl)=>{
          console.log(downloadUrl);
          value.image=downloadUrl;
          value.userName=user.fullName;
          value.userEmail=user.primaryEmailAddress.emailAddress;
          value.userImage=user.imageUrl;
          const docRef = await addDoc(collection(db, "UserPost"), value);
          if(docRef.id){
            alert('Post added successfully')
            console.log("Document written with ID: ", docRef.id);
          }
        })
      });
    } catch (error) {
      // This will catch errors in fetching the image, converting it to a blob, or uploading it
      console.error("Upload error:", error);

    }
  };


  return (
    <KeyboardAvoidingView>
    <ScrollView className="p-8">
      <Text className="text-2xl font-bold mt-5 mb-4">Add Post</Text>
      <TouchableOpacity onPress={pickImage}>
        {image? <Image source={{uri:image}} className="w-[200px] h-[100px] object-cover border-r-8"></Image>:<Image source={require('./../../assets/images/addimage.jpg')}
        className="w-[200px] h-[100px] object-cover border-r-8"
        />}
      
      </TouchableOpacity>
      <Formik 
      initialValues={{title:'',desc:'',category:'',address:'',price:0,userName:'',userEmail:'',userImage:'',createdAt:Date.now()}}
      onSubmit={value=>onSubmitMethod(value)}
      validate={(values)=>{
        const errors = {};
        if(!values.title){
          console.log('title is required')
          errors.name="title is required"
        }
        return errors;
      }}>
        {({handleChange,handleBlur,handleSubmit,values,setFieldValue,errors})=>(
          <View>
            <TextInput style={styles.input} placeholder='Title' value={values?.title} onChangeText={handleChange('title')}>
            </TextInput>
            <TextInput style={styles.input} placeholder='Desciption' value={values?.desc} numberOfLines={5} onChangeText={handleChange('desc')}>
            </TextInput>
            <TextInput style={styles.input} keyboardType='numeric' placeholder='Price' value={values?.price} onChangeText={handleChange('price')}>
            </TextInput>
            <TextInput style={styles.input} placeholder='Address' value={values?.address} numberOfLines={5} onChangeText={handleChange('address')}>
            </TextInput>

            <Picker
            selectedValue={values?.category}
            onValueChange={handleChange('category')}>
              {categoryList&&categoryList.map((item,index)=>(
                <Picker.Item label={item.name} value={item.name}/>
              ))}
            </Picker>

            {/* <Button title='Submit' onPress={handleSubmit}></Button> */}
            <TouchableOpacity onPress={handleSubmit} className="p-4 bg-blue-400 rounded-full">
                <Text className="text-white text-center ">Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderRadius:10,
    borderColor:"black",
    padding:10,
    marginBottom:10,
    marginTop:20,
    fontSize:15
  }
})