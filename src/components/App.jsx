import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addContact, deleteContact, updateFilter } from '../redux/contacts/slice.js';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { Wrapper } from './App.styled.js';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const formSubmitHandler = (name, number) => {
    const duplicates = contacts.find(contact => contact.name === name || contact.number === number);

    duplicates
    ? Notify.failure(`${name} is already in contacts.`)
    : dispatch(addContact({
        id: nanoid(),
        name,
        number
      }));
  };
  
    const deleteContactHander = contactID => {
    dispatch(deleteContact(contactID));
  };
  
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const visibleContacts = getVisibleContacts();
  
    return (
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
      
        <h2>Contacts</h2>
        <Filter onChange={(e) => dispatch(updateFilter(e.currentTarget.value))} />
        <ContactList contacts={visibleContacts} onDeleteContact={deleteContactHander} />
      </Wrapper>
    );
  }

export default App;
