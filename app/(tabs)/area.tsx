// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button } from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Tile Component */}
      <TouchableOpacity
        style={styles.tile}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.tileText}>Open Modal</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tile: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    elevation: 3,
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

export default App;
