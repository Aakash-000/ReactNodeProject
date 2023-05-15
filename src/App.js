import React, { useState, useEffect } from 'react';
import AddForm from './AddForm';
import StickyNoteList from './StickyNoteList';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [notes, setNotes] = useState([]);

    useEffect(() => {
      function fetch(){
    fetchNotes();
      }
      fetch()
    }, [notes]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = async (note) => {
    try {
      const response = await axios.post('http://localhost:5000/api/notes', note);
      setNotes((prevNotes) => [...prevNotes, response.data]);
      if(response.status == 201){
        alert('Added Successfully')
      }else{
        alert(`Couldn't Add`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      let response = await axios.delete(`http://localhost:5000/api/notes/${id}`);
      if(response.status == 200){
        alert('Deleted Successfully')
      }else{
        alert(`No Delete`);
      }
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async (id,index,updatedNote) => {
    try {
      let response = await axios.put(`http://localhost:5000/api/notes/${id}`,updatedNote);
      if(response.status == 200){
        alert('Updated Successfully')
      }else{
        alert(`No Update`);
      }
      const updatedNotes = [...notes];
      updatedNotes[index] = updatedNote;
      setNotes(updatedNotes);
  } catch (error) {
    console.error(error);
    }
  };  

  return (
    <div className="container-fluid mt-4">
      <h1 className="mb-4">Sticky Note App</h1>
      <AddForm addNote={addNote}/>
      <hr />
      <StickyNoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote}/>
    </div>
  );
};

export default App;
