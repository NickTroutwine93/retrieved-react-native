import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, getDocs, getDoc, query, where, orderBy, GeoPoint, Timestamp  } from "firebase/firestore";
 
const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_FB_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_FB_PROJID,
	storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKEY,
	messagingSenderId: process.env.EXPO_PUBLIC_FB_MSGSENDERID,
	appId: process.env.EXPO_PUBLIC_FB_APPID,
	measurementId: process.env.EXPO_PUBLIC_FB_MEASUREMENTID
}; 

const app1 = initializeApp(firebaseConfig); 
const db = getFirestore(app1); 

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      GetUserData()
    }
    async function GetUserData(){
      
      let q = query(collection(db, "accounts"), where("Email", "==", "test@gmail.com"));
      const querySnapshot = await getDocs(q); 
      querySnapshot.forEach((doc) => { 
        let userData = doc.data(); 
        console.log(userData.LastName); 
        let lastName = userData.LastName;
        alert(lastName);
      });
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
