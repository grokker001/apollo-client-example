import React from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom'

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
                    (<li key={item.id}><Link to={item.id < 0 ? '/': `contact/${item.id}`}>{item.firstName} {item.lastName}</Link></li>)
                ) 
            }
        </ul>
    )
}

export default graphql(contactsListQuery)(Contacts);