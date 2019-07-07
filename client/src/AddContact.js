import React, { Component } from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { contactsListQuery } from './Contacts'


class AddContact extends Component {
    constructor(props) {
        super(props)
        this.state = { firstName: '', lastName: '' }
    }

    handleFirstNameChange = (e) => { this.setState({firstName: e.target.value})}

    handleLastNameChange = (e) => { this.setState({lastName: e.target.value})}

    handleSave = () => {
        const { firstName, lastName } = this.state
        const id = require('crypto').randomBytes(5).toString('hex');
        this.props.mutate({
            variables: { id, firstName, lastName },
            optimisticResponse: {
                addContact: {
                    id,
                    firstName,
                    lastName,
                    __typename: 'Contact',
                }
            },
            update: (proxy, { data: {addContact} }) => {
                const data = proxy.readQuery({ query: contactsListQuery} )
                proxy.writeQuery({
                    query: contactsListQuery, 
                    data: { 
                        contacts: [...data.contacts, addContact]
                    }
                })
                // The following comes from the document and doesn't work...!
                // data.contacts.push(addContact)
                // proxy.writeQuery({query: contactsListQuery, data})
            }
        }).then ( res => {
            this.setState({firstName: '', lastName: ''})
        })
    }
     
    render() {
        return (
            <div>
                <input type="text"
                    value={this.state.firstName}
                    onChange={this.handleFirstNameChange} />
                <input type="text"
                    value={this.state.lastName}
                    onChange={this.handleLastNameChange} />
                <button onClick={this.handleSave}>Save</button>
            </div>
        )
    }
}

const createContact = gql`
    mutation AddNewContact($id: String!, $firstName: String!, $lastName: String!) {
        addContact(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

export default graphql(createContact)(AddContact)