import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import { contactSingleQuery } from './ContactSingle'


const AddNote = ({ mutate, match }) => {
    const newId = Math.round(Math.random() * -1000000);
    const handleSubmit = (event) => {
        if (event.keyCode === 13) {
            mutate({
              variables: {
                note: {
                  contactId: match.params.contactId,
                  details: event.target.value
              }
            },
            optimisticResponse: {
              addNote: {
                details: event.target.value,
                id: newId,
                __typename: 'Note',
              },
            },
            update: (store, { data: { addNote }}) => {
              const data = store.readQuery({ 
                query: contactSingleQuery,
                variables: {
                  contactId: match.params.contactId
                } 
              });
              
              if (!data.contact.notes.find((item) => item.id === addNote.id)) {
                //data.contact.notes.push(addNote);
                data.contact.notes = [...data.contact.notes, addNote];
              }
      
              store.writeQuery({
                query: contactSingleQuery,
                variables: {
                  contactId: match.params.contactId
                },
                data
              });
            },
          });
            event.target.value = '';
          }
    }
    return (
        <div>
            <input
                type="text"
                onKeyUp={handleSubmit}
            />
        </div>
    )
}

const addNoteMutation = gql`
    mutation addNote($note: NoteInput! ) {
        addNote(note: $note) {
            id
            details
        }
    }
`;

export default graphql(addNoteMutation)(withRouter(AddNote));