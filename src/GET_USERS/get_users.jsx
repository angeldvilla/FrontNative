import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Alert, Modal, Pressable } from 'react-native';

const GetUsers = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.cardView}>
      <ImageBackground
        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/004/510/924/non_2x/dna-strand-icon-logo-vector.jpg' }}
        style={styles.backCard}
        blurRadius={7}
      >
        <Text style={styles.name}>{props.name}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={openModal}>
            <Text style={{ color: 'white',textShadowColor: 'black', fontSize: 15, fontWeight: '900' }}>Details</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {modalVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            closeModal();
          }}
        >
          <View style={styles.centeredView}>
            <ImageBackground source={require('../IMAGENES/fondoModal.png')} style={styles.modalView} blurRadius={12}>
            {/* <View style={styles.modalView}> */}
            {/* <Text style={styles.modalText}>User Details:</Text> */}

            {/* <Image source={{ uri: props.image }} style={styles.imageUser} /> */}

            <Text style={{color:'orange',textShadowColor: 'black', fontWeight: '900', marginVertical: 2, fontSize: 16}}>USERNAME: </Text>
            <Text style={styles.textStyle}>{props.username} {'\n'}{'\n'}</Text> 

            <Text style={{color:'orange',textShadowColor: 'black', fontWeight: '900', marginVertical: 2, fontSize: 16}}>NAME: </Text>
              <Text style={styles.textStyle}>{props.name} {'\n'}{'\n'}</Text>

              <Text style={{color:'orange',textShadowColor: 'black', fontWeight: '900', marginVertical: 2, fontSize: 16}}>LASTNAME: </Text>
              <Text style={styles.textStyle}>{props.lastname}{'\n'}{'\n'}</Text> 

              <Text style={{color:'orange', textShadowColor: 'black', fontWeight: '900', marginVertical: 2, fontSize: 16}}>EMAIL: </Text>
              <Text style={styles.textStyle}>{props.email}{'\n'}{'\n'}</Text> 

              <Text style={{color:'orange', textShadowColor: 'black',fontWeight: '900', marginVertical: 2, fontSize: 16}}>CELLPHONE: </Text>
              <Text style={styles.textStyle}>{props.cellphone}{'\n'}{'\n'}</Text> 


              <Pressable style={[styles.button, styles.buttonClose]} onPress={closeModal}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            {/* </View> */}
            </ImageBackground>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    maxHeight: 200,
    borderRadius: 3,
    padding: 3,
    marginVertical: 10,
    backgroundColor: '#8e76ae67',
    shadowColor: '#353634ae',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backCard: {
    flex: 1,
    borderRadius: 25,
    width: 170,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    textTransform: 'uppercase',
    fontWeight: '900',
    color: 'white',
    fontStyle: 'italic',
  },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  editButton: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: 'orange',
    marginHorizontal: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    marginTop: 50,
    borderRadius: 20,
    width: 350,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    marginTop: 15,
    textAlign: 'center',
    width: 70,
    height: 40,
    padding:10,
    backgroundColor: '#f32144',
    fontSize: 15
  },
  textStyle: {
    color: 'white',
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: 2,
    fontSize: 15,
  },
/*  modalText: {
    color:'white',
    marginBottom: 15,
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 18,
    fontStyle:'italic'
  },
   imageUser:{
    width: 100, 
    height: 100, 
    marginBottom:15, 
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#d32d54',
  } */
});

export default GetUsers;