import './Note.css';
import { useState } from 'react';
import { editNote } from '../../api/editNote';
import {deleteNote} from '../../api/deleteNote';

function Note ( {author, title, content, created_at, checked, color, id, favorite, notebookId, onDelete, isNew} ) {

    const [check, setCheck] = useState(checked ?? false);
    const [fav, setFav] = useState(favorite ?? false);

    const toggleCheck = () => {
        setCheck(!check);
    };

    const toggleFav = ( ) => {
        setFav(!fav);
    }


    const handleCheckButton = async (e) => {
        e.stopPropagation();
        const newCheck = !check;
        toggleCheck();
        editNote(notebookId, id, title, content,newCheck, color);
        
    };

    const handleFavouriteButton = async (e) => {
        e.stopPropagation();
        toggleFav();


    };

    const handleDeleteButton = async (e) => {
        e.stopPropagation();
        const response = await deleteNote(notebookId, id);
        if (response) { 
            onDelete(id);
        }
    };


    return (
        <button className={`note-container ${check ? 'note-checked' : ''} ${isNew ? 'note-enter' : ''}`} style={{backgroundColor:color}}>
            <div className='note-header'>
                <h2>{title}</h2>
                <div className='note-buttons'>
                    <button className={`delete-note-button`} onClick={handleDeleteButton}>
                        <span className='material-icons'>delete</span>
                    </button>
                    <button className={`fav-note-button ${fav ? 'faved-note-button' : ''}`} onClick={handleFavouriteButton}>
                        <span className='material-icons'>favorite</span>
                    </button>
                    <button className={`check-button ${check ? 'checked-button' : ''}`} onClick={handleCheckButton}>
                        <span className='material-icons'>check</span>
                    </button>
                </div>
            </div>
            <div className='note-content'>
                <p>{content}</p>
                
            </div>
            <div className='note-footer'>
                <p>{author}</p>
                <p>{created_at}</p>
            </div>

        </button>
    );
}

export default Note;