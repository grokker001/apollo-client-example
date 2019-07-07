export const typeDefs = `
    type Contact {
        id: ID!
        firstName: String
        lastName: String
    }

    type Query {
        contacts: [Contact]
    }

    type Mutation {
        addContact(id: String!, firstName: String!, lastName: String!): Contact
    }
`;

export default typeDefs;