// add_users.jsx
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const AddUsers = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.texto}
      keyboardType={props.tipo}
      secureTextEntry={props.seguridad}
      onChangeText={props.campo}
      value={props.valor}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#c2c4c2',
    borderWidth: 2,
    borderColor: '#11b8aaca',
    width: 280,
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
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
});

export default AddUsers;