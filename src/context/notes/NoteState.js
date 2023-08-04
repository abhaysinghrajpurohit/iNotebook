
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState=(props)=>{
    const host=process.env.REACT_APP_HOST_URL;
    const notesInitial=[]

    const [notes,setNotes]=useState(notesInitial);

    //GET ALL NOTES
    const getNotes=async()=>{
        //API call
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
           method:'GET',
           headers:{
               'Content-Type':'application/json',
               'auth-token':localStorage.getItem("token")
           }
       });
       const json=await response.json()
      setNotes(json)
   }
    
    //Add a Note
    const addNote=async(title,description,tag)=>{
         //API call
         const response=await fetch(`${host}/api/notes/addnotes`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem("token")
            },
            body:JSON.stringify({title,description,tag})
        });

        const json=await response.json()
      setNotes(notes.concat(json))
    }

    // Delete a Note
    const deleteNote=async(id)=>{
        //API call
        
       await fetch(`${host}/api/notes/deletenotes/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem("token")
            },
        });
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes)
        
    }

    //Edit a Note
    const editNote=async(id,title,description,tag)=>{
        
        //API call
       await fetch(`${host}/api/notes/updatenotes/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem("token")
            },
            body:JSON.stringify({title,description,tag})
        });
        

        let new_notes=JSON.parse(JSON.stringify(notes))
        
        for (let index = 0; index < new_notes.length; index++) {
            const element = new_notes[index];
            if(element._id===id){               
                new_notes[index].title=title;
                new_notes[index].description=description;
                new_notes[index].tag=tag;
                break;            
            }
        }
        setNotes(new_notes);
    }

    return(
        <noteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
            
        </noteContext.Provider>
    )
}

export default NoteState;
