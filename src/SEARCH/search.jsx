import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Search = (props) => {
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = () => {
    props.onSearch(searchResult);
    setSearchResult('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchResult}
        onChangeText={(text) => setSearchResult(text)}
      />

      <TouchableOpacity onPress={handleSearch}>
        <View style={styles.iconContainer}>
          <Image source={require('../IMAGENES/loupe.png')} style={styles.loupe} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',
      },
      input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'cyan',
        borderRadius: 10,
        paddingHorizontal: 10,
        placeholderTextColor: 'grey',
        color: 'white',
        fontStyle:'italic',
        fontSize: 17,
        fontWeight:'700'
      },
      iconContainer: {
        marginLeft: 10,
      },
      loupe: {
        width: 30,
        height: 30,
      },
});

export default Search;