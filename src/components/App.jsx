import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { Wrapper } from './App.styled.js';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const formSubmitHandler = (name, number) => {
    const duplicates = contacts.find(contact => contact.name === name || contact.number === number);
    
    const newContact = {
      id: nanoid(),
      name,
      number
    };

    const alertMessage = `${name} is already in contacts.`;

    duplicates ? Notify.failure(alertMessage) : setContacts(prevState => [newContact, ...prevState]);
  };
  
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };
  
  const deleteContact = contactID => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== contactID)
    ));
  };
  
  const visibleContacts = getVisibleContacts();

    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
      
        <h2>Contacts</h2>
        <Filter value={filter} onChange={(e) => setFilter(e.currentTarget.value)} />
        <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
      </Wrapper>
    );
  }

export default App;



// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: "",
//   };
  
//   formSubmitHandler = (name, number) => {
//     const { contacts } = this.state;

//     const duplicates = contacts.find(contact => contact.name === name || contact.number === number);

//     const newContact = {
//       id: nanoid(),
//       name,
//       number
//     };

//     const alertMessage = `${name} is already in contacts.`

//     duplicates ? Notify.failure(alertMessage) : this.setState(prevState => ({
//       contacts: [newContact, ...prevState.contacts]
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
//   };

//   deleteContact = contactID => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactID)
//     }));
//   };

//   componentDidUpdate(prevState) {
//     const { contacts } = this.state;

//     if (contacts !== prevState.contacts)
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     };
//   };

//   render() {
//     const { filter } = this.state;

//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <Wrapper>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.formSubmitHandler} />
        
//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={this.changeFilter} />
//         <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
//       </Wrapper>
//     );
//   };
// };

