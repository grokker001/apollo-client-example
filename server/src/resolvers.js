import { PubSub, withFilter } from 'apollo-server-express'

const pubsub = new PubSub();

const contacts = [
    {
        id: "1",
        firstName: "Test",
        lastName: "UserOne",
        notes: [
            {
                id: "1",
                details: "Some details"
            },
            {
                id: "2",
                details: "This is a test user"
            }
        ]
    }, 
    {
        id: "2",
        firstName: "Test",
        lastName: "UserTwo",
        notes: [
            {
                id: "1",
                details: "Some details"
            },
            {
                id: "2",
                details: "This is a test user two"
            }
        ]
    }
];

const resolvers = {
    Query: {
        contacts: () => {
            return contacts;
        },
        contact: (root, { id }) => {
            return contacts.find(contact => contact.id === id)
        }
    },

    Mutation: {
        addContact: (root, { id, firstName, lastName }) => {
            const newContact = { id, firstName, lastName }
            // Here simulate the real server update
            newContact.lastName = "Test"
            newContact.notes = []
            contacts.push(newContact);
            return newContact;            
        },
        addNote: (root, { note }) => {
            const newId = require('crypto').randomBytes(5).toString('hex');
            const contact = contacts.find(contact => contact.id === note.contactId);
            const newNote = { id: String(newId), details: note.details };
            contact.notes.push(newNote);
            pubsub.publish('noteAdded', { noteAdded: newNote, contactId: note.contactId})
            return newNote
        }
    }, 

    Subscription: {
        noteAdded: {
            subscribe: withFilter (
                () => pubsub.asyncIterator('noteAdded'),
                (payload, variables) => {
                    return payload.contactId === variables.contactId
                }
            )
        }
    }

}

export default resolvers;