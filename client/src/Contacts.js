import React from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';

export const contactsListQuery = gql`
    query ContactsQuery {
        contacts {
            id
            firstName
            lastName
        }
    }
`;

const Contacts = ({ data: { loading, error, contacts} }) => 
{
    console.log("contact refreshed...")
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Loading...</p>
    }
    return (
        <ul>
            { 
                contacts.map ( item => 
                    (<li key={item.id}>{item.firstName} {item.lastName}</li>)
                ) 
            }
        </ul>
    )
}

export default graphql(contactsListQuery)(Contacts);