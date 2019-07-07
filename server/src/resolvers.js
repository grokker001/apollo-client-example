const contacts = [
    {
        id: 1,
        firstName: "Test",
        lastName: "UserOne"
    }, 
    {
        id: 2,
        firstName: "Test",
        lastName: "UserTwo"
    }
];

const resolvers = {
    Query: {
        contacts: () => {
            return contacts;
        }
    },

    Mutation: {
        addContact: (root, args) => {
            const newContact = {id: args.id, firstName: args.firstName, lastName: args.lastName}
            // Here simulate the real server update
            newContact.lastName = "Test"
            contacts.push(newContact);
            return newContact;            
        }
    }
}

export default resolvers;