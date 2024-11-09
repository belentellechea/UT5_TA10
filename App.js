import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/Entypo'

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <View style={styles.errorContainer}>
          <Icon2 name='warning' size={25} style={styles.warning}/>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
       
      ) : location ? (
        <View>
          <Text style={styles.title}>Ubicación del dispositivo: </Text>
          <Text style={styles.text}>Latitud: {location.coords.latitude}</Text>
          <Text style={styles.text}>Longitud: {location.coords.longitude}</Text>
        </View>
      ) : (
        <View>
          <Icon name='loader' size={50} style={styles.icon}/>
          <Text style={styles.text}>Cargando ubicación...</Text> 
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edf2fb',
  },
  text: {
    fontSize: 20,
    color: '#9381ff',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center'
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  icon: {
    color: '#9381ff',
    alignSelf: 'center'
  }, 
  title: {
    fontSize: 25,
    alignSelf: 'center', 
    fontWeight: 'bold', 
    marginBottom: 30 
  }, 
  errorContainer: {
    backgroundColor: '#abc4ff',
    padding: 20,
    borderRadius: 30, 
    display: 'flex', 
    flexDirection: 'row',
    gap: 15
  }, 
  warning: {
    color: '#9e2a2b'
  }
});


