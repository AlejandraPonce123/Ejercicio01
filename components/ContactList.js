import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  // Cargar contactos desde AsyncStorage
  const loadContacts = async () => {
    try {
      const contactsData = await AsyncStorage.getItem('contacts');
      if (contactsData !== null) {
        setContacts(JSON.parse(contactsData));
      }
    } catch (error) {
      console.error('Error al cargar los contactos', error);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Calcular color basado en fecha de cumpleaños
  const getBackgroundColor = (birthday) => {
    const today = new Date();
    const birthdayDate = new Date(birthday);
    const todayMonthDay = `${today.getMonth()}-${today.getDate()}`;
    const birthdayMonthDay = `${birthdayDate.getMonth()}-${birthdayDate.getDate()}`;

    if (todayMonthDay === birthdayMonthDay) {
      return styles.contactToday;
    } else if (birthdayDate < today) {
      return styles.contactPast;
    } else {
      return styles.contactUpcoming;
    }
  };

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={getBackgroundColor(item.birthday)}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactBirthday}>Cumpleaños: {item.birthday}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  contactToday: {
    backgroundColor: '#4CAF50', // Verde para cumpleaños del día
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  contactPast: {
    backgroundColor: '#F44336', // Rojo para cumpleaños pasados
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  contactUpcoming: {
    backgroundColor: '#2196F3', // Azul para próximos cumpleaños
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactBirthday: {
    fontSize: 14,
    color: '#555',
  },
});

export default ContactList;
