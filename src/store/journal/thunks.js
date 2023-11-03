import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {

    return async(dispatch, getState) => {
        dispatch(savingNewNote())

        const { uid } = getState().auth;
        //uid
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imgURLs: []
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes`));
        const setDocResp = await setDoc( newDoc, newNote)         //Modificar la regal en firestore para los usuarios autenticados 
        
        newNote.id = newDoc.id;
        //dispatch
        //dispatch de la nueva nota grabada
        dispatch(addNewEmptyNote( newNote))
        dispatch(setActiveNote( newNote));
    }

}

export const startLoadingNotes = () => {

    return async(dispatch, getState) => {
        const { uid } = getState().auth; 
        if(!uid) throw new Error('El usuario no existe')   
        const notesList = await loadNotes(uid);
        dispatch(setNotes( notesList))
    }
  
  }
  
  export const startSavingNote = () => {
    return async(dispatch, getState) => {
        
        try {
            dispatch(setSaving());
            const { uid } = getState().auth; 
            const { active:note } = getState().journal; 
            const noteToFirestore = {...note};
            delete noteToFirestore.id; //elimnamos la propiedad id de la nota
            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`); 
            await setDoc(docRef, noteToFirestore, { merge: true})
            dispatch(updateNote(note))
        } catch (error) {
            console.log(error)
        }
        
    }
  }

export const startUploadingFiles = ( files = []) => {
    return async(dispatch)=> {

        dispatch(setSaving());

        // await fileUpload(files[0]); //Esta sirve para hacer peticiones de manera una tras otra pero NO en simultaneo
        const fileUploadPromises = []; //Primero creamos un arreglo de promesas
        for (const file of files) {
            fileUploadPromises.push( fileUpload(file));
        }

        const photoUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photoUrls));
        
    }
}

export const startDeletingNotes = () => {
     return async(dispatch, getState) => {
        const { uid} = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id))

    }}

  