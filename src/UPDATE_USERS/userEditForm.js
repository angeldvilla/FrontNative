import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

import AlertModal from '../MODALS/AlertModal';

const UserEditForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [name, setName] = useState(user.name);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [cellphone, setCellphone] = useState(user.cellphone);
  const [id_user, setId_User] = useState(user.id_user);
  const [showPassword, setShowPassword] = useState(false);

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

  // Función para actualizar un usuario con petición PUT
  const updateUser = async () => {
    const obj = { id_user, username, password, name, lastname, email, cellphone };
  
    try {
      const response = await axios.put('http://192.168.1.2/apiusers/', obj);
      if (response.data.success) {
        showAlertModal('User not updated');
      } else {
        showAlertModal('User updated successfully');
      }
    } catch (error) {
      showAlertModal('User not updated');
    }
  };

  // Función para navegar a la pantalla de edición de usuarios
 /*  const navigateToEditUser = () => {
    navigation.navigate('EditUser');
  }; */

  useEffect(() => {
    let timeoutId;
  
    if (showModal) {
      // No se establece un tiempo de espera para redirigir automáticamente
      return;
    }
  
    if (!showModal && modalMessage === 'User updated successfully') {
      // Redirige a EditUser después de que el usuario cierre el modal
      navigation.navigate('EditUser');
    }
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showModal]);
  

  // Función para el botón "cancel" del formulario
  const handleCancelEdit = () => {
    setShowModal(false);
    navigation.navigate('EditUser');
  };
  

  // Renderizar formulario
  return (
    <ImageBackground source={{ uri: 'https://i.makeagif.com/media/1-31-2016/i11hwP.gif' }} style={styles.backgroundImage} blurRadius={10}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <ImageBackground source={require('../IMAGENES/fondoEditForm.jpg')} blurRadius={12}>
              <View style={styles.form}>
                <Text style={{ alignItems: 'center', fontSize: 25, fontWeight: '800', color: 'white', backgroundColor: '#ec0b40c6', paddingHorizontal: 20, marginBottom: 20 }}>User Information</Text>

               {/*  <TouchableOpacity style={styles.selectImageBtn}>
                  <Text style={styles.selectImageText}>Select Image</Text>
                </TouchableOpacity> */}

                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={username}
                  onChangeText={(value) => setUsername(value)}
                />

                {/* INPUT PASSWORD */}
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: 'transparent', paddingBottom: 1 }}>
                    <View style={{ height: 55, width: 222 }}>
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        secureTextEntry={!showPassword}
                      />
                    </View>
                    <TouchableOpacity onPress={toggleShowPassword} style={{ width: 30, alignItems: 'center' }}>
                      <Icon
                        name={showPassword ? 'eye-slash' : 'eye'}
                        size={18}
                        color={showPassword ? 'black' : 'grey'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* INPUT PASSWORD */}

                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={(value) => setName(value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Lastname"
                  value={lastname}
                  onChangeText={(value) => setLastname(value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Cellphone"
                  value={cellphone}
                  onChangeText={(value) => setCellphone(value)}
                />

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <View style={{ marginLeft: 20 }} >
                    <TouchableOpacity style={styles.Putbutton} onPress={updateUser}>
                      <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancel} onPress={handleCancelEdit}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
      <AlertModal visible={showModal} message={modalMessage} onClose={closeModal} />
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

  form: {
    borderRadius: 10,
    padding: 30,
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

    input: {
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 2,
        borderColor: 'orange',
        backgroundColor: '#c2c4c3',
        width:250,
        marginVertical:10,
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: 'black',
        fontSize: 16,
        placeholderTextColor: 'grey',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.84,
        elevation: 5,
      },
      Putbutton: {
        backgroundColor: 'yellowgreen',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginVertical: 10,
        fontWeight: '900',
        textShadowColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cancel: {
        backgroundColor: '#ff0101ec',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        marginVertical: 10,
        fontWeight: '900',
        textShadowColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '900',
        textShadowColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
  /*     selectImageBtn: {
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
      }, */
})

export default UserEditForm;