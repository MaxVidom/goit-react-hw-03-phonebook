import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import AddContactForm from './AddContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevProps.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    if (
      contacts.some(contact => contact.name.toLowerCase() === normalizedName)
    ) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = evt => {
    const { value } = evt.currentTarget;
    this.setState({
      filter: value,
    });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;
    return (
      <>
        <h2>Phonebook</h2>
        <AddContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
