import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

//---------------------------------------
import Nav from '../NAV/nav';
import Search from '../SEARCH/search';
import UserNoFound from '../MODALS/userNoFound';
//---------------------------------------


const EditUser = () => {
  const [searchResult, setSearchResult] = useState(null);

  const navigation = useNavigation();

  const isFocused = useIsFocused();


  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

    // Función para mostrar el modal de alerta
    const showAlertModal = (message) => {
      setModalMessage(message);
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
    };


  useEffect(() => {
    // Limpia la búsqueda cuando el componente está enfocado nuevamente
    setSearchResult(null);
  }, [isFocused]);


  // tenemos una funcion constante que sera renderizada para ir a otro componente
  const editUser = (user) => {
    navigation.navigate('FormEdit', { user });
  };
  

  //Función para buscar el usuario por nombre
  const searchUser = async (name) => {
    try {
      const response = await axios.get(`http://192.168.1.2/apiusers/?name=${name}`);
      console.log(response.data);
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
  
//Función para buscar el usuario por nombre


  return (
    <ImageBackground source={{ uri: 'https://i.makeagif.com/media/1-31-2016/i11hwP.gif' }} style={styles.backgroundImage} blurRadius={10}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Search User for Edit:</Text>
            <Search onSearch={searchUser} />

            {searchResult !== null ? (
            <View>
            <ImageBackground style={styles.userCard} source={require('../IMAGENES/cardSearch.jpg')} blurRadius={12} borderRadius={10}>

            {/* <Image source={ {uri: ('https://w0.peakpx.com/wallpaper/985/504/HD-wallpaper-canserbero-2-canserbero-rap-thumbnail.jpg')}} style={styles.imageUser} /> */}

            <Text style={styles.cardText}>Username: <Text style={{color:'#c1eb36', textShadowColor: 'black',}}>{searchResult.username}</Text></Text>

            <Text style={styles.cardText}>Name: <Text style={{color:'#c1eb36', textShadowColor: 'black',}}>{searchResult.name}</Text></Text>

            <Text style={styles.cardText}>Lastname: <Text style={{color:'#c1eb36', textShadowColor: 'black',}}>{searchResult.lastname}</Text></Text>

            <Text style={styles.cardText}>Email: <Text style={{color:'#c1eb36', textShadowColor: 'black',}}>{searchResult.email}</Text></Text>

            <Text style={styles.cardText}>Cellphone: <Text style={{color:'#c1eb36', textShadowColor: 'black',}}>{searchResult.cellphone}</Text></Text>
              <TouchableOpacity style={{ marginTop: 15 }} onPress={() => editUser(searchResult)}>
                <Ionicons name="md-create" size={26} color="#c1eb36" />
              </TouchableOpacity>
              </ImageBackground>
            </View>
          ) : (
            <Text style={styles.NotFound}>No user found</Text>
          )}
            <Nav />
          </View>
        </View>
      </ScrollView>
      <UserNoFound visible={showModal} message={modalMessage} onClose={closeModal} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 355,
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
    color: 'white',
    fontWeight: '900',
    textShadowColor:'black',
    backgroundColor: '#5cb1f2a9',
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

  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '900',
  },

  NotFound:{
    textAlign:'center',
    backgroundColor: '#5cb1f2a9',
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    textShadowColor:'black',
    fontStyle: 'italic',
  },

  /* imageUser:{
    width: 100, 
    height: 100, 
    marginBottom:15, 
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#1cff7ee0',
  } */

});

export default EditUser;