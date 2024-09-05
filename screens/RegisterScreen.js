import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const navigation = useNavigation();

  // Guardar contacto en AsyncStorage
  const saveContact = async () => {
    if (name === '' || birthday === '') {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const newContact = {
      id: Date.now().toString(),  // Generar un ID único
      name,
      birthday,
    };

    try {
      // Obtener los contactos guardados
      const storedContacts = await AsyncStorage.getItem('contacts');
      let contacts = [];

      if (storedContacts !== null) {
        contacts = JSON.parse(storedContacts);
      }

      // Añadir nuevo contacto
      contacts.push(newContact);

      // Guardar la lista actualizada en AsyncStorage
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));

      // Limpiar campos y mostrar alerta de éxito
      setName('');
      setBirthday('');
      Alert.alert('Éxito', 'Contacto guardado correctamente');

      // Navegar a la pantalla de contactos
      navigation.navigate('Contacts');
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al guardar el contacto');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingresa el nombre"
      />
      <Text style={styles.label}>Fecha de Cumpleaños (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={birthday}
        onChangeText={setBirthday}
        placeholder="Ingresa la fecha de cumpleaños"
      />
      <Button title="Guardar Contacto" onPress={saveContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default RegisterScreen;
