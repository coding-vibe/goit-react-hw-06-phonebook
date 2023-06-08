import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Input } from './Filter.styled.js';

const Filter = ({ onChange }) => {
    const filterInputId = shortid.generate();
      const filter = useSelector(state => state.contacts.filter);
    
    
    return (
        <label>
            Find contacts by name
            <Input
                type="text"
                value={filter}
                name="filter"
                id={filterInputId}
                onChange={onChange}
                required
            />
            </label>
    );
};

Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default Filter;