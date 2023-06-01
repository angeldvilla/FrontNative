// dependencias y hooks
import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, ImageBackground} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
/* import * as ImagePicker from 'react-native-image-picker'; */
//-------------------------------------------------------------------------

//componentes
import AddUsers from './add_users';
import Nav from '../NAV/nav';
import AlertModal from '../MODALS/AlertModal';
//-------------------------------------------------------------------------
const NewUser = () => {

    // manejo de hooks para los estados de los campos (inputs)
      
    const [username, setUsername] = useState('');
    
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [photo, setPhoto] = useState(null);
    const [fileName, setFileName] = useState('');

    
    const navigation = useNavigation();

    //funcion para ocultar o mostrar la password
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

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

      const navigateToAllUsers = () => {
        navigation.navigate('AllUsers');
      };
      
      
 /*  // Función para seleccionar una imagen de la galería
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setPhoto(response.uri);
        setFileName(response.fileName);
      }
    });
  }; */
   
   // funcion que envia una peticion post para agregar un usuario completando los campos requeridos
   const addUser = async() => {
    if (username === '' || password === '' || name === '' || lastname === '' || email === '' || cellphone === '') {
      showAlertModal('You must complete the fields')
      return;
    }

    const obj = {username, password, name, lastname, email, cellphone};
    const response = await axios.post('http://192.168.1.2/apiusers/', obj);
    if(!response.data.success){
      setUsername('');
      setPassword('');
      setName('');
      setLastname('');
      setEmail('');
      setCellphone(''); 
    
      showAlertModal('User added successfully');
      navigateToAllUsers();
    
    } else {
  
      showAlertModal('User not added');
    }
  }

  /* const addUser = async () => {
    if (username === '' || password === '' || name === '' || lastname === '' || email === '' || cellphone === '') {
      showAlertModal('You must complete all fields');
      return;
    }

    const apiUrl = 'http://192.168.1.2/apiusers/';

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('cellphone', cellphone);
    if (photo) {
      formData.append('photo', {
        uri: photo,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
    }

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setUsername('');
        setPassword('');
        setName('');
        setLastname('');
        setEmail('');
        setCellphone('');
        setPhoto(null);

        showAlertModal('User added successfully');
        navigateToAllUsers();
      } else {
        showAlertModal('Failed to add user');
      }
    } catch (error) {
      console.error(error);
      showAlertModal('An error occurred while adding the user');
    }
  }; */
  
  return(
    <ImageBackground source={{uri:'https://i.makeagif.com/media/10-18-2015/aIFaTP.gif'}} style={styles.backgroundImage} blurRadius={10}>
    
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.overlay}>
    
    <View style={styles.container}>
    <ImageBackground source={require('../IMAGENES/fondoAddForm.png')} blurRadius={12}>
    <View style={styles.form}>
    <Text style={styles.title}>User New Add</Text>

    <AddUsers 
    texto={"Username"} 
    valor={username} 
    obligatorio={true} 
    campo={(value) => setUsername(value)}/>

        {/* INPUT PASSWORD */}
        <View style={styles.passwordContainer}>
                <AddUsers
                  texto="Password"
                  valor={password}
                  seguridad={!showPassword}
                  campo={(value) => setPassword(value)}/>

            <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordVisibilityIcon}>
              <Icon
                name={showPassword ? 'eye-slash' : 'eye'}
                size={18}
                color={showPassword ? 'black' : 'grey'}
                />
            </TouchableOpacity>
        </View>
        {/* INPUT PASSWORD */}

    <AddUsers 
    texto={"Name"} 
    valor={name} 
    obligatorio={true} 
    campo={(value) => setName(value)}/>

    <AddUsers
    texto={"Lastname"} 
    valor={lastname} 
    obligatorio={true} 
    campo={(value) => setLastname(value)}/>

    <AddUsers 
    texto={"Email"} 
    valor={email} 
    tipo={"email"} 
    obligatorio={true} 
    campo={(value) => setEmail(value)}/>

    <AddUsers 
    texto={"Cellphone"} 
    valor={cellphone} 
    tipo={"numeric"} 
    obligatorio={true} 
    campo={(value) => setCellphone(value)}/>

      {/* <TouchableOpacity  style={styles.selectImageBtn} onPress={selectImage}>
          <Text style={styles.selectImageText}>Select Image</Text>
        </TouchableOpacity>
        { photo && <Image source={{ uri: photo }} style={styles.selectedImage} /> }

        <Text style={{color:'black', fontStyle:'italic', fontWeight:'900', fontSize:12}}>{fileName}</Text> */}
        
      </View>
        </ImageBackground>

    <TouchableOpacity 
        style={styles.buttonAdd}
        onPress={addUser}>
        <Text style={{color:'white', fontWeight:'900', fontSize:15}}> Add User</Text>
    </TouchableOpacity>

      <Nav />
    </View>
    </View>
    </ScrollView>
    <AlertModal visible={showModal} message={modalMessage} onClose={closeModal} />
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
    justifyContent: 'center',
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
  
  form: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },

  title: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: 'black',
    marginBottom: 25,
    color: 'white',
    backgroundColor: "#28b926c0",
    paddingHorizontal: 25
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordVisibilityIcon: {
    position: 'absolute',
    right: 6,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '900',
  },

  buttonAdd: {
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
    marginTop: 25,
    width: 95,
    height: 40,
    padding:10,
    backgroundColor: "#15e012d6",
    borderRadius:20
  },

  
 /*  selectImageBtn: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#11b8aaca',
    width: 125,
    padding: 5,
    borderRadius: 50,
    marginVertical: 10,
  },

  selectImageText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 15,
    textAlign: 'center',
  },

  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  }, */

});


export default NewUser;