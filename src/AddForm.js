import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddForm = ({addNote}) => {
  const [noteText, setNoteText] = useState('');

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2);
    return `${timestamp}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noteText.trim() !== '') {
        const id = parseInt(generateUniqueId()); 
        const note = {
          id,text: noteText.trim(),
          date:`${new Date().getHours() > 12 ? new Date().getHours()-12:new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} ${new Date().getHours() > 12 ? 'PM' : 'AM'}`.trim()};
          addNote(note);
          setNoteText('');
    
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <textarea
          className="form-control"
          placeholder="Enter note"
          value={noteText}
          rows={5}
          onChange={(e) => setNoteText(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" type="submit">
          Add Note
        </button>
    </form>
  );
};

export default AddForm;
