import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        filter: ""
    },
    reducers: {
        addContact: (state, { payload }) => {
            state.contacts.push(payload);
        },
        deleteContact: (state, { payload }) => {
            state.contacts = state.contacts.filter(contact => contact.id !== payload);
        },
        updateFilter: (state, { payload }) => {
            state.filter = payload;
        }
    },
});

const persistConfig = {
    key: 'contacts',
    storage,
    blacklist: ['filter'],
};

export const contactsReducer = persistReducer(persistConfig, contactsSlice.reducer);

export const { addContact, deleteContact, updateFilter } = contactsSlice.actions;
