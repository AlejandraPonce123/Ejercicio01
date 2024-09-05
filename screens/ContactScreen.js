const ContactScreen = () => {
    const [contacts, setContacts] = useState([]);
  
    const loadContacts = async () => {
      try {
        const contactsData = await AsyncStorage.getItem('contacts');
        if (contactsData) {
          setContacts(JSON.parse(contactsData));
        }
      } catch (e) {
        console.error("Error al cargar los contactos", e);
      }
    };
  
    useEffect(() => {
      loadContacts();
    }, []);
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
  