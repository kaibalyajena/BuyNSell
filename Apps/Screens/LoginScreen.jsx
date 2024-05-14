import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import {useWarmUpBrowser} from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
    
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);

  return (
    <View>
        <Image source={require('./../../assets/images/login_image.jpg')}
        className="w-full h-[400px] object-cover"
        />
        <View className="p-8">
            <Text className="text-2xl font-bold">Welcome to BuynSell</Text>
            <Text className="text-lg">Please Login to continue</Text>
            <TouchableOpacity onPress={onPress} className="p-4 bg-blue-400 rounded-full mt-20">
                <Text className="text-white text-center ">Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}   