import { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { InputName, InputNumber, Button } from './ContactForm.styled.js';

const ContactForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameInputId = shortid.generate();
    const numberInputId = shortid.generate();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(name, number);
        reset();
    };
    
    const reset = () => {
        setName('')
        setNumber('')
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={nameInputId}>Name</label>
            <InputName
                type="text"
                name="name"
                id={nameInputId}
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                required />
            <label htmlFor={numberInputId}>Number</label>
            <InputNumber
                type="tel"
                name="number"
                id={numberInputId}
                value={number}
                onChange={(e) => setNumber(e.currentTarget.value)}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}" title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />
            <Button type="submit">Add contact</Button>
        </form>
    );
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

export default ContactForm;