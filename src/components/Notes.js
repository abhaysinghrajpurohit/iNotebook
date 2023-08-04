import React,{useContext, useEffect,useRef,useState} from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import {useHistory} from 'react-router-dom';


const Notes = (props) => {
    const context=useContext(noteContext);
    const {notes,getNotes,editNote}=context;

    const[note,setNote]=useState({etitle:"",edescription:"",etag:""})
    let history=useHistory();
    
    useEffect(() => {
      if(localStorage.getItem("token")){
        getNotes();
      }else{
        history.push("/login")
      }
      
    }, [])

    const ref=useRef(null);
    const refClose=useRef(null);

    const updateNote=(currentnote)=>{
      
   
        ref.current.click();
        setNote({id:currentnote._id,etitle:currentnote.title, edescription:currentnote.description,etag:currentnote.tag})
       
    }
    
  

    const handleClick=(e)=>{
            e.preventDefault();
            editNote(note.id,note.etitle,note.edescription,note.etag);
            refClose.current.click(); 
            props.showAlert("Updated Successfully","success")

    }
    const handleChange=(e)=>{
            setNote({...note,[e.target.name]:e.target.value})
            
    }
    
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
   
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header text-bg-warning">
        <h5 className="modal-title " id="exampleModalLabel">Edit Note..</h5>
        {/* <button type="button" className="close btn btn-dark" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> */}
      </div>
      <div className="modal-body">
      <div className='container my-3 '>
      <div className='container w-75 p-3 shadow-sm p-3 mb-5 bg-white rounded'>
      <form className=''>
  <div className="form-group  my-2 ">
    <label htmlFor="etitle">Title</label>
    <input type="text" className="form-control" id="etitle" name='etitle'  placeholder="Enter title (Minimum Length-5)" onChange={handleChange} value={note.etitle} />
    </div>
  <div className="form-group my-2">
    <label htmlFor="edescription">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Description (Minimum Length-5)" onChange={handleChange} value={note.edescription}/>
  </div>

  <div className="form-group">
    <label htmlFor="etag">Tag</label>
    <input type="text" className="form-control" id="etag"name="etag" placeholder="Add a Tag" onChange={handleChange} value={note.etag}/>
  </div>
  
  
</form>
    </div>
    </div>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick}type="button" className="btn btn-outline-success">Update Note</button>
      </div>
    </div>
  </div>
</div>


    <div className='container'>
    <div className='row my-3'>
    <h2>Your Notes :</h2>
    <div className="container mx-1">
    {notes.length===0 &&"No notes to display."}
    </div>
    
        {notes.map((note)=>{
            return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}></NoteItem>
        })}
    </div>
    </div>
    </>
    
  )
}

export default Notes;