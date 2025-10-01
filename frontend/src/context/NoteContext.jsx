import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../api/url";

export const NoteContext = createContext();

export const NoteProvider=({children})=>{
    const [notes, setNotes] = useState([]);
const [loading, setLoading] = useState(true);

// fetch all notes
const getNotes = async() => {
    setLoading(true);
    try {
        const response = await BACKEND_URL.get("/api/v1/noteapp/get-notes");
    //   await BACKEND_URL.get("/get-notes");
        setNotes(response.data);
    } catch (error) {
        console.error("Error fetching notes:", error);
    } finally {
        setLoading(false);
    }
}

useEffect(()=>{
    getNotes();
},[])

// create a note
const createNote = async(note) => {
    const res=await BACKEND_URL.post("/api/v1/noteapp/create-note", note)
    // await BACKEND_URL.post("/create-note",note)
    setNotes([res.data,...notes])
}

// update a note
const updateNote = async(id, updateNote) => {
    const res=await BACKEND_URL.put(`/api/v1/noteapp/update-note/${id}`, updateNote)
    // await BACKEND_URL.put(`/update-note/${id}`,updateNote)
    setNotes(notes.map((note)=>(note._id===id ? res.data : note)))
}

// delete a note
const deleteNote = async(id) => {
    // await BACKEND_URL.delete(`/delete-note/${id}`)
    await BACKEND_URL.delete(`/api/v1/noteapp/delete-note/${id}`)

    setNotes(notes.filter((note)=>(note._id!==id)))
}

return(
    <NoteContext.Provider value={{notes,loading,createNote,updateNote,deleteNote}}>
        {children}
    </NoteContext.Provider>
)
}
