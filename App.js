//Dependencias o hooks!
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';
//------------------------------------------------------------

// importacion de los componentes
import Login from './src/LOGIN/login';
import Home from './src/HOME/home';
import usersList from './src/GET_USERS/usersList';
import newUser from './src/ADD_USERS/newUser';
import editUser from './src/UPDATE_USERS/editUser';
import UserEditForm from './src/UPDATE_USERS/userEditForm';
import DeleteUser from './src/DELETE_USERS/deleteUser';
//------------------------------------------------------------

// crear una pila para las pantallas
const Stack = createStackNavigator();

const App = () => {

  //manejo de vistas (redireccion a los componentes creados)
  return (
    <NavigationContainer>

      <Stack.Navigator>
         
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
  <Stack.Screen name="Home"  component={Home}  options={{ headerShown: false }} />
  <Stack.Screen name="AddUser" component={newUser} options={{ headerShown: false }} />
  <Stack.Screen name="AllUsers"  component={usersList}  options={{ headerShown: false }} />
  <Stack.Screen name="EditUser" component={editUser} options={{ headerShown: false }} />
  <Stack.Screen name="FormEdit" component={UserEditForm} options={{ headerShown: false }} />
 <Stack.Screen name="DeleteUser" component={DeleteUser} options={{ headerShown: false }} />
          

      </Stack.Navigator>

    </NavigationContainer>
  );
};
//------------------------------------------------------------

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
});


export default App;