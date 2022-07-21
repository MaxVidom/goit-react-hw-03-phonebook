import React, { Component } from 'react';

class addContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = evt => {
    this.setState({
      [evt.currentTarget.name]: evt.currentTarget.value,
    });
  };

  handleSubmitForm = evt => {
    const { name, number } = this.state;
    if (name.length === 0 || number.length === 0) {
      console.log('please enter your contact');
      return;
    }
    evt.preventDefault();
    this.props.onSubmit(name, number);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form action="">
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={this.handleInputChange}
        />
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleInputChange}
        />
        <button type="submit" onClick={this.handleSubmitForm}>
          Submit
        </button>
      </form>
    );
  }
}

export default addContactsForm;
