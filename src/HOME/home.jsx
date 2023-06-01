import React from 'react';
import { StyleSheet, View, ScrollView, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from '../NAV/nav';

const Home = () => {

   const navigation = useNavigation();

  return (
    <ImageBackground source={{uri: 'https://thumbs.gfycat.com/GoodFlashyEyelashpitviper-max-1mb.gif'}} style={[styles.backgroundImage, { opacity:1.2 }]} blurRadius={10}>
      
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.overlay}>
        
        <View style={styles.container}>

        <View style={styles.modalRight}>
        <TouchableOpacity style={styles.alignRight} onPress={() => navigation.navigate('Login')}>
              <Image source={require('../IMAGENES/logout.png')} style={styles.alignRightIcon}/>
            </TouchableOpacity>
        </View>

        <View style={styles.alarmLeft}>
        <TouchableOpacity style={styles.alignLeft}>
              <Image source={require('../IMAGENES/bell1.png')} style={styles.alignLeftAlarm}/>
            </TouchableOpacity>
        </View>

          <Text style={styles.title}> <Text style={{color:'#ffffff', textShadowColor: 'black'}}>Hello! </Text> 👋
          </Text>
          <Text style={styles.subtitle}>Welcome to the users CRUD app!</Text>

      
          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('AddUser')}>
            <View style={styles.card}>
              <Image source={require('../IMAGENES/add-user.png')} style={styles.cardImage} />
              <Text style={styles.cardTitle}>Add</Text>
              <Text style={styles.cardDescription}>Create a new user</Text>
            </View>
              </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('AllUsers')}>
            <View style={styles.card}>
              <Image source={require('../IMAGENES/eye.png')} style={styles.cardImage} />
              <Text style={styles.cardTitle}>View</Text>
              <Text style={styles.cardDescription}>View all users</Text>
            </View>
              </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('EditUser')}>
            <View style={styles.card}>
              <Image source={require('../IMAGENES/editUsers.png')} style={styles.cardImage} />
              <Text style={styles.cardTitle}>Edit</Text>
              <Text style={styles.cardDescription}>User information</Text>
            </View>
              </TouchableOpacity>


            <TouchableOpacity onPress={() => navigation.navigate('DeleteUser')}>
            <View style={styles.card}>
              <Image source={require('../IMAGENES/trash-can.png')} style={styles.cardImage} />
              <Text style={styles.cardTitle}>Delete</Text>
             <Text style={styles.cardDescription}>Delete a user</Text>
            </View>
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
    marginTop: -15,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 10,
    backgroundColor: '#b6afaf', 
    paddingHorizontal: 25
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
    textShadowColor: 'black',
    backgroundColor: '#afb0b60', 
    paddingHorizontal: 15
  },
  cardContainer: {
    flex: -1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems:'center',
    textAlign:'center',
    marginBottom: 20,
  },
  card: {
    width: '85%',
    backgroundColor: '#ecc236',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#2dd39e',
    padding: 15,
    margin: 7,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f6f1f1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    alignItems: 'center',
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  cardTitle: {
    justifyContent: 'center',
    alignItems:'center',
    textAlign:'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: 'white',
  },
  cardDescription: {
    justifyContent: 'center',
    alignItems:'center',
    textAlign:'center',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor: 'white',
  },
  modalRight: {
    position: 'absolute',
    shadowColor: 'white',
    top: 50,
    right: 12,
  },
  alignRightIcon: {
    shadowColor: 'white',
    width: 25,
    height: 30,
  },
  alarmLeft:{
    position: 'absolute',
    shadowColor: 'white',
    top: 50,
    left: 15,
  },
  alignLeftAlarm:{
    shadowColor: 'white',
    width: 25,
    height: 30,
  }

});

export default Home;
