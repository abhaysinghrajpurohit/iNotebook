import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;

    const[note,setNote]=useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
            e.preventDefault();
            addNote(note.title,note.description,note.tag);
            setNote({title:"",description:"",tag:""})
            props.showAlert("Note Added Successfully","success")
    }
    const handleChange=(e)=>{
            setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className='container my-3 '>
      <div className='container w-75 p-3 shadow-sm p-3 mb-5 bg-white rounded'>
      <form className=''>
  <div className="form-group  my-2 ">
    <label htmlFor="title">Title</label>
    <input type="text" className="form-control" id="title" name='title'value={note.title}  placeholder="Enter title (Minimum Length-5)" onChange={handleChange} />
    </div>
  <div className="form-group my-2">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control" id="description"name="description" value={note.description} placeholder="Description (Minimum Length-5)" onChange={handleChange}/>
  </div>

  <div className="form-group">
    <label htmlFor="tag">Tag</label>
    <input type="text" className="form-control" id="tag"name="tag"value={note.tag} placeholder="Add a Tag" onChange={handleChange}/>
  </div>
  
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-warning my-3" onClick={handleClick}>Add Note</button>
</form>
    </div>
    </div>
  )
}

export default AddNote
