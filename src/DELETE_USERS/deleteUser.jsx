import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image, Modal } from 'react-native';
import { useNavigation, useIsFocused} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import Nav from '../NAV/nav';
import Search from '../SEARCH/search';
import UserNoFound from '../MODALS/userNoFound';

const DeleteUser = (props) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [searchResult, setSearchResult] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [viewModal, setViewModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Función para mostrar el modal de alerta
  const showAlertModal = (message) => {
    setModalMessage(message);
    setViewModal(true);
  };

  const closeAlertModal = () => {
    setViewModal(false);
  };

  // Función para abrir el modal de confirmación
  const openModal = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  // Función para cerrar el modal de confirmación
  const closeModal = () => {
    setShowModal(false);
  };

  // Función para eliminar el usuario y cerrar el modal
  const handleDeleteUser = async () => {
    await deleteUser(userToDelete);
    closeModal();
    navigation.navigate('DeleteUser');
  };

  // Función para eliminar un usuario
  const deleteUser = async (user) => {
    try {
      const response = await axios.delete(`http://192.168.1.2/apiusers/?id_user=${user.id_user}`);
      if (!response.data.success) {
        showAlertModal('Deleted', 'User deleted successfully');
        setSearchResult(null);
      } else {
        showAlertModal('Error', 'User not deleted');
      }
    } catch (error) {
      showAlertModal('Error', 'User not deleted');
    }
  };

  // Función para buscar el usuario por nombre
  const searchUser = async (name) => {
    try {
      const response = await axios.get(`http://192.168.1.2/apiusers/?name=${name}`);
      const filteredUsers = response.data.filter((user) => user.name.toLowerCase() === name.toLowerCase());
      if (filteredUsers.length > 0) {
        setSearchResult(filteredUsers[0]);
      } else {
        showAlertModal('No user found');
        setSearchResult(null);
      }
    } catch (error) {
      showAlertModal('No user found');
      setSearchResult(null);
    }
  };

  // Limpia la búsqueda cuando el componente está enfocado nuevamente
  useEffect(() => {
    setSearchResult(null);
  }, [isFocused]);

  return (
    <ImageBackground source={require('../IMAGENES/fondoDelete.gif')} style={styles.backgroundImage} blurRadius={14}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Search User for Delete:</Text>
            <Search onSearch={searchUser} />

            {searchResult !== null ? (
              <View>
                <ImageBackground style={styles.userCard} source={require('../IMAGENES/cardDelete.jpg')} blurRadius={12} borderRadius={10}>
                  
                 {/*  <Image source={{ uri: 'https://w0.peakpx.com/wallpaper/985/504/HD-wallpaper-canserbero-2-canserbero-rap-thumbnail.jpg' }} style={styles.imageUser} /> */}

                  <Text style={styles.cardText}>Username: <Text style={{ color: '#6deb36', textShadowColor: 'black' }}>{searchResult.username}</Text></Text>

                  <Text style={styles.cardText}>Name: <Text style={{ color: '#6deb36', textShadowColor: 'black' }}>{searchResult.name}</Text></Text>

                  <Text style={styles.cardText}>Lastname: <Text style={{ color: '#6deb36', textShadowColor: 'black' }}>{searchResult.lastname}</Text></Text>

                  <Text style={styles.cardText}>Email: <Text style={{ color: '#6deb36', textShadowColor: 'black' }}>{searchResult.email}</Text></Text>

                  <Text style={styles.cardText}>Cellphone: <Text style={{ color: '#6deb36', textShadowColor: 'black' }}>{searchResult.cellphone}</Text></Text>
                  <TouchableOpacity style={{ marginTop: 15 }} onPress={() => openModal(searchResult)}>
                    <Ionicons name="md-trash" size={26} color="#fc3d3d" />
                  </TouchableOpacity>

                </ImageBackground>
              </View>
            ) : (
              <Text style={styles.NotFound}>No user found</Text>
            )}
            <Nav />
            <Modal visible={showModal} animationType="fade" transparent={true}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Delete User</Text>

                  <Text style={styles.modalText}>Are you sure you want to delete this user?</Text>

                  <View style={styles.modalButtonsContainer}>
                    <TouchableOpacity style={styles.modalButton} onPress={handleDeleteUser}>
                      <Text style={styles.buttonText}>Yes, delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalButtonCancel} onPress={closeModal}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
      <UserNoFound visible={viewModal} message={modalMessage} onClose={closeAlertModal} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 360,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(211, 205, 205, 0.1)',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginTop: -190,
    marginBottom: 20,
    fontWeight: '900',
    textShadowColor:'black',
    color: 'white',
    backgroundColor: '#c0f826a9',
    paddingHorizontal: 20,
  },
  userCard: {
    width: 320,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign:'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '900',
    color: 'white',
    textShadowColor: 'black',
  },
 
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#54db1ae4',
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
    textAlign:'center',
    alignItems: 'center',
  },
  modalButtonCancel:{
    flex: 1,
    backgroundColor: '#f70707ef',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
    textAlign:'center',
    alignItems: 'center',
  },
  
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
  },
  NotFound:{
    textAlign:'center',
    backgroundColor: '#c0f826a9',
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    textShadowColor:'black',
    fontStyle: 'italic'
  },
  /* imageUser:{
    width: 100, 
    height: 100, 
    marginBottom:15, 
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#d32d54',
  } */

});

export default DeleteUser;