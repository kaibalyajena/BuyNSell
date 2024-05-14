import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigations/TabNavigation';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_aHVtYmxlLXF1ZXR6YWwtMS5jbGVyay5hY2NvdW50cy5kZXYk'>
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <SignedIn>
        <NavigationContainer>
          <TabNavigation></TabNavigation>
        </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
    </View>
    </ClerkProvider>
  );
}


