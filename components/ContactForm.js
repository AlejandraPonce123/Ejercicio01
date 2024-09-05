import AsyncStorage from '@react-native-async-storage/async-storage';

const saveContact = async (contact) => {
  try {
    const existingContacts = await AsyncStorage.getItem('contacts');
    const contacts = existingContacts ? JSON.parse(existingContacts) : [];
    contacts.push(contact);
    await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
  } catch (e) {
    console.error("Error al guardar el contacto", e);
  }
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