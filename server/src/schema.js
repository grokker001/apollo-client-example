import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Contact {
        id: ID!
        firstName: String
        lastName: String
        notes: [Note]!
    }

    input NoteInput {
        contactId: ID!
        details: String
    }

    type Note {
        id: ID!
        details: String
    }

    type Query {
        contacts: [Contact]
        contact(id: ID!): Contact
    }

    type Mutation {
        addContact(id: String!, firstName: String!, lastName: String!): Contact
        addNote(note: NoteInput!): Note
    }

    type Subscription {
        noteAdded(contactId: ID!): Note
    }
`;

export default typeDefs;