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



// class ContactForm extends Component {
//     state = {
//         name: '',
//         number: ''
//     };

//     nameInputId = shortid.generate();
//     numberInputId = shortid.generate();
    
//     handleChange = e => {
//         const { name, value } = e.currentTarget;
        
//         this.setState({ [name]: value });
//     };
    
//     handleSubmit = e => {
//         e.preventDefault();
        
//         const { name, number } = this.state;
        
//         this.props.onSubmit(name, number);
//         this.reset();
//     };

//     reset = () => {
//         this.setState({ name: '', number: '' });
//     };
    
//     render() {
//         const { name, number } = this.state;

//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label htmlFor={this.nameInputId}>Name</label>
//                 <InputName
//                     type="text"
//                     name="name"
//                     id={this.nameInputId}
//                     value={name}
//                     onChange={this.handleChange}
//                     pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                     required
//                 />
//                 <label htmlFor={this.numberInputId}>Number</label>
//                 <InputNumber
//                     type="tel"
//                     name="number"
//                     id={this.numberInputId}
//                     value={number}
//                     onChange={this.handleChange}
//                     pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                     title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                     required
//                 />
//                 <Button type="submit">Add contact</Button>
//             </form>
//         );
//     };
// };

// ContactForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

// export default ContactForm;