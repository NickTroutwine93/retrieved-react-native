 
import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, Platform, Text, View, TouchableOpacity, Modal, Button, FlatList } from 'react-native';


import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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

const DATA = [
  { id: '1', title: 'Tile 1' },
  { id: '2', title: 'Tile 2' },
  { id: '3', title: 'Tile 3' },
  { id: '4', title: 'Tile 4' },
  { id: '5', title: 'Tile 5' },
  { id: '6', title: 'Tile 6' },
  // Add more items as needed
];




export default function HomeScreen() { 
  const [firstName, setFirstName] = React.useState("Unknown");
  const [modalVisible, setModalVisible] = useState(false);
  const [radius, setRadius] = React.useState(0);
  console.log(firstName);
  GetUserData()
  async function GetUserData(){
      
    let q = query(collection(db, "accounts"), where("Email", "==", "test@gmail.com"));
    const querySnapshot = await getDocs(q); 
    querySnapshot.forEach((doc) => { 
      let userData = doc.data();   
      setFirstName(userData.FirstName);
      setRadius(userData.radius);
      console.log(userData);
			GetUserPetData(doc.id, 0)
    });
  };
  
  const Tile = ({ title }) => (
    <ThemedView style={[styles.petTile, styles.shadowProp]}> 
      <ThemedText style={styles.petinfo}>
        <View style={styles.petName}>{title.Name}</View>
        <View style={styles.petRow}>Breed: {title.Breed}</View> 
        <View style={styles.petRow}>Size: {title.Size}</View> 
      </ThemedText>
      <Image
        source={require('@/assets/images/rigby.jpg')}
        style={styles.puppyPic}
      />
      {/* Tile Component */}
      <TouchableOpacity
        style={styles.tile}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.tileText}>Create Search</Text>
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>This is a Modal!</Text>
            <Button title="Close Modal" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
  let petsArray = [];
	async function GetUserPetData(lookupID, yourPet){
		let q;
		if(yourPet == 0){
			q = query(collection(db, "pets"), where("OwnerID", "==", lookupID))
		}else{
			q = query(collection(db, "pets"), where("searchID", "in", lookupID))
		};
		const querySnapshot = await getDocs(q); 
		querySnapshot.forEach((doc) => { 
			let userPetData = doc.data();
			console.log(userPetData);
			let petID = doc.id;
			userPetData.PetID = petID;
			petsArray.push(userPetData);
      console.log(petsArray);
		});
  }
  const renderItem = ({ item }) => <Tile title={item}/>;
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#0d81a1', dark: '#1D3D47' }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! {firstName}</ThemedText> 
      </ThemedView>
      <ThemedView style={styles.stepContainer}> 
        <ThemedText>
          Your notification range is set to: {radius}
          <Image
          source={require('@/assets/images/mapApprox.jpg')}
          style={styles.mapPic}
        />
        </ThemedText>
      </ThemedView>  
    <FlatList
      data={petsArray}
      renderItem={renderItem}
      keyExtractor={item => item.PetID}
      numColumns={1} // Adjust this for different grid sizes
    />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8, 
    borderWidth: 2,
    borderColor: '#a9a9a9',
    borderRadius: 20, 
    padding: 15,

  },
  mapPic: { 
    width: 300, 
    height: 200,
    margin: 'auto',
  },
  petTile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: 20, 
    borderColor: '#4d4545',
    padding: 15,
    backgroundColor: '#a9bfc5',
    marginBottom: 10,
  },
  
shadowProp: {
  shadowColor: '#171717',
  shadowOffset: { width: 2, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  },
  petinfo: {
    width: '50%', 
  },
  puppyPic: { 
    width: '50%', 
    height: 200, 
  },
  petName: { 
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tile: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f5665',
    borderRadius: 10,
    elevation: 3,
    margin: 'auto',
    marginTop: 10,
  },
  tileText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },

});
