import React from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Nav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navContainer}>
      <ImageBackground style={styles.backgroundImage}>

        <View style={styles.buttonContainer}>
        
          <TouchableOpacity onPress={() => navigation.navigate('AddUser')} style={styles.button}>
            <Image style={styles.buttonImage} source={require('../IMAGENES/addNav.png')}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AllUsers')} style={styles.button}>
            <Image style={styles.buttonImage} source={require('../IMAGENES/viewNav.png')}/>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
            <Image style={styles.buttonImage} source={require('../IMAGENES/home.png')}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('EditUser')} style={styles.button}>
            <Image style={styles.buttonImage} source={require('../IMAGENES/editNav.png')}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('DeleteUser')} style={styles.button}>
            <Image style={styles.buttonImage} source={require('../IMAGENES/deleteNav.png')}/>
          </TouchableOpacity>

        </View>
      
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: '#1e1d1d',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    overlayColor: 'rgba(255, 255, 255, 0.1)',
    blurRadius: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 20,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
});

export default Nav;
