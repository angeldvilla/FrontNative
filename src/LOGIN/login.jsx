//Dependencias o hooks!
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
/* import Swal from 'sweetalert2'; */
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
//------------------------------------------------------------

const Login = () => {
  
  //manejo de estados
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  //-----------------------------------------
 
  //manejo de ver u ocultar password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //-----------------------------------

  // funcion para limpiar los inputs del login
  const clearInputs = () => {
    setUsername('');
    setPassword('');
    setError('');
  };
  //-----------------------------------


  //manejo para redirijir a otro componente
  const navigation = useNavigation();


  //funcion de validació de login!
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.2/apiusers/login.php', { username, password });
     
      const data = response.data;

      if (data.status === 'success') {
        //Redirecciona a la pagina home!
        /* alert('Login Successful'); */
        /* Swal.fire({
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: true,
          timer: 5500
        }); */
        clearInputs();
        navigation.navigate('Home');
      } 
        else {
         /* alert('Invalid Username or Password'); */
          /* setError( Swal.fire({
            icon: 'error',
            title: 'Invalid username or password',
            showConfirmButton: true,
            timer: 5500
          })
          ); */
          setError(data.message);
      }
    } catch (error) {
      navigation.navigate('Login');
      setError('Incorrect data, try again!');
      clearInputs();
    }
  };
 
  // Limpiar los inputs alcargar el componente
   useEffect(() => {
    clearInputs();
   }, []);

 //---------------------------------------------------

 // vista de la interfaz login!
  return (
    <ImageBackground source={{uri:'https://gd-hbimg.huaban.com/27afdb1f11898c78859747e427a3fb85a91f1d7a225ef-CE7Klw'}} style={styles.backgroundImage} blurRadius={12}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={{uri:'https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif'}} style={{ width: 100, height: 100, marginBottom: 15, borderRadius: 50 }} />
          </View>
          <Text style={{ fontSize: 50, marginBottom: 20, color: 'white', fontWeight: '900' }}>FrontUsers!</Text>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={value => setUsername(value)}
            value={username}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={styles.passwordInput}
              onChangeText={value => setPassword(value)}
              value={password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordVisibilityButton}>
              <Icon
                name={showPassword ? 'eye-slash' : 'eye'}
                size={22}
                color={showPassword ? 'white' : 'grey'}
              />
            </TouchableOpacity>
            
          
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            
            <Text style={styles.loginButtonText}>Login 
            <Icon2 name="login" size={19} color="black" style={{ marginLeft: 5 }} />
            </Text>

          </TouchableOpacity>
          
          <TouchableOpacity style={styles.loginButtonText}> 
          <Text style={styles.forgotPass}>Forgot password?</Text> 
          </TouchableOpacity>

        </View>
      </ScrollView>
    </ImageBackground>
  );
};

//--------------------------------------------------------------------------------------------

// estilos del login!
const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 270,
    borderColor: '#08a8f3',
    borderWidth: 2,
    marginBottom: 10,
    marginVertical: 20,
    borderRadius: 20,
    placeholderTextColor: 'grey',
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    width: 270,
    borderColor: '#08a8f3',
    borderWidth: 2,
    borderRadius: 20,
    placeholderTextColor: 'grey',
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginLeft: 3.8,
    marginRight: -50
  },
  passwordVisibilityButton: {
    height: 55,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'orange',
    fontWeight: '800',
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#ffbc05e9',
    padding: 15,
    width: 120,
    height: 50,
    borderRadius: 30,
    textAlign: 'center',
    marginVertical: 25,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    justifyContent:'center',
    textAlign: 'center'
  },

  forgotPass:{
    color: 'white', 
    fontSize: 15, 
    fontWeight:'800',
    fontStyle: 'italic',
  }
});

export default Login;