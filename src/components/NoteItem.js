import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context=useContext(noteContext);
    const{deleteNote,editNote}=context;

   const {note,updateNote}=props;

  return (
    <>
    <div className='col-md-3'>
     
    

    <div className="card my-3" >  
        <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text text-secondary">{note.tag}</p>
    <p className="card-text">{note.description}</p>
    <i className=" btn btn-warning fa-sharp fa-solid fa-trash mx-2 trash" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully","success")}}></i>
    <i className="btn btn-warning fa-solid fa-pen-to-square mx-2 edit" onClick={()=>{updateNote(note)}}></i>
   
  </div>
</div>
    </div>
    </>
  )
}

export default NoteItem
