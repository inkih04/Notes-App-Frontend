import './Note.css';
import { useState } from 'react';
import { editNote } from '../../api/editNote';
import {deleteNote} from '../../api/deleteNote';
import {createFavourite} from '../../api/createFavourite';
import { deleteFavourite } from '../../api/deleteFavourite';
import { Modal} from '@mui/material'

function Note ( {author, title, content, created_at, checked, color, id, notebookId, onDelete, isNew, isFavourite, hideDelete, hideCheck} ) {

    const [check, setCheck] = useState(checked ?? false);
    const [fav, setFav] = useState(isFavourite ?? false);
    const [openModal, setOpenModal] = useState(false);

    const toggleCheck = () => {
        setCheck(!check);
    };

    const toggleFav = async (e) => {
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
        if (!fav) {
            await createFavourite(id);
        }
        else {
            await deleteFavourite(id);
        }
        toggleFav();
    };

    const handleDeleteButton = async (e) => {
        e.stopPropagation();
        const response = await deleteNote(notebookId, id);
        if (response) { 
            onDelete(id);
        }
    };

    const handleOpenModal = (e) => {
        e.stopPropagation();
        setOpenModal(true);
    }

    const handleCloseModal = () => setOpenModal(false);


    return (
        <>
            <button className={`note-container ${check ? 'note-checked' : ''} ${isNew ? 'note-enter' : ''}`} style={{backgroundColor:color}}>
                <div className='note-header'>
                    <h2>{title}</h2>
                    <div className='note-buttons'>
                        {!hideDelete && (
                            <button className={`delete-note-button`} onClick={handleOpenModal}>
                                <span className='material-icons'>delete</span>
                            </button>
                        )}
                        <button className={`fav-note-button ${fav ? 'faved-note-button' : ''}`} onClick={handleFavouriteButton}>
                            <span className='material-icons'>favorite</span>
                        </button>
                        {!hideCheck && (
                            <button className={`check-button ${check ? 'checked-button' : ''}`} onClick={handleCheckButton}>
                                <span className='material-icons'>check</span>
                            </button>
                        )}
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

            <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
                <div className='modal-delete-note'>
                    <div className='note-modal-content'>
                        <div className='note-modal-header'>
                            <h3 id="modal-title">Delete note?</h3>
                            <p id="modal-description">This action cannot be undone. The note will be permanently deleted.</p>
                        </div>
                    </div>
                    <div className='note-modal-buttons'>
                        <button className='note-modal-cancel-button' onClick={handleCloseModal}>
                            Cancel
                        </button>
                        <button className='note-modal-delete-button' onClick={(e) => {
                            handleDeleteButton(e);
                            handleCloseModal();
                        }}>
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Note;