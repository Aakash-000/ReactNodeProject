import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';


const StickyNoteList = ({ updateNote,deleteNote }) => {

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNoteArray(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [notearray, setNoteArray] = useState([]);

  const handleDelete = async (id) => {
      deleteNote(id);
  };
  const handleUpdate = async (id,index,newText) => {
      const updatedNote = { id:id, text: newText, date: notearray[index].date };
      updateNote(id,index,updatedNote);
  };

  
  return (
    <div className="row gap-3" style={{padding:'15px',width:'100vw'}}>
      {notearray.map((note,index) => (
        <div className="col-lg-4 col-sm-6" key={index}  style={{
          margin:'0px',
          maxHeight:'200px',
          maxWidth:'430px',
          overflow:'scroll',
        border:'1px solid rgba(0, 0, 0, 0.2)',
        boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        padding:'10px 10px',borderRadius:'15px'}} >
          <textarea rows={7} cols={70} 
          onChange={(e)=>setNoteArray(notearray.map((item, i) => i === index ? { ...item, text: e.target.value } : item))}
          value={note.text}
          style={{fontSize:'15px',border:'none',
          fontFamily:'Helvetica,sans-serif',fontWeight:'500'}}>
            </textarea>
          
          <div className="text-muted small">Created at: {note.date}</div>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'10px',margin:'10px 0px'}}>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(note.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-sm btn-info"
            onClick={() => handleUpdate(note.id,index,notearray[index].text)}
          >
            Update
          </button>
          </div>
        </div>
      ))}  
    </div>
  );
};

export default StickyNoteList;
