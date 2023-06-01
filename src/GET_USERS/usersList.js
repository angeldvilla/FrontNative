import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import axios from 'axios';

import GetUsers from '../GET_USERS/get_users';
import Nav from '../NAV/nav';

const UsersList = () => {
  const [listUsers, setListUsers] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const respuesta = await axios.get('http://192.168.1.2/apiusers/');
    setListUsers(respuesta.data);
  };

  const viewUsers = ({ item: user, index }) => (
    <GetUsers
      key={user['id_user']}
      id_user={user['id_user']}
      /* image={require('../IMAGENES/descarga.jpg')} */
      username={user['username']}
      name={user['name']}
      lastname={user['lastname']}
      email={user['email']}
      cellphone={user['cellphone']}
      isActive={index === currentCardIndex}
    />
  );

  const handleNextCard = () => {
    if (currentCardIndex < listUsers.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <ImageBackground source={{ uri: 'https://media.tenor.com/Zco-fadJri4AAAAM/code-matrix.gif' }} style={styles.backgroundImage} blurRadius={10}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Users List</Text>

            <View style={styles.mainCard}>
              <FlatList
                data={listUsers}
                renderItem={viewUsers}
                horizontal
                pagingEnabled
                keyExtractor={(user) => user['id_user']}
                onMomentumScrollEnd={(event) => {
                  const contentOffset = event.nativeEvent.contentOffset;
                  const index = Math.round(contentOffset.x / Dimensions.get('window').width);
                  setCurrentCardIndex(index);
                }}
              />
            </View>

            <View style={styles.cardsContainer}>
              <TouchableOpacity style={styles.arrowButton} onPress={handlePreviousCard}>
                <Image source={require('../IMAGENES/arrowsLeft.png')} style={styles.arrowsImages} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.arrowButton} onPress={handleNextCard}>
                <Image source={require('../IMAGENES/arrowsRight.png')} style={styles.arrowsImages} />
              </TouchableOpacity>
            </View>

            <Nav />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginTop: -120,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: 'black',
    marginBottom: 110, 
    color: 'white', 
    backgroundColor:'#ecbf0bc8',
    paddingHorizontal: 25
  },

  mainCard: {
    width: 320,
    aspectRatio: 2.1,
    backgroundColor: 'grey',
    borderRadius: 10,
    overflow: 'hidden',
  },

  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  arrowButton: {
    marginHorizontal: 10,
  },

  arrowsImages: {
    width: 30,
    height: 30,
  }
});

export default UsersList;