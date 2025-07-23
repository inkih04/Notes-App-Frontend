import './Note.css';
import { useState } from 'react';
import { editNote } from '../../api/editNote';
import {deleteNote} from '../../api/deleteNote';
import {createFavourite} from '../../api/createFavourite';
import { deleteFavourite } from '../../api/deleteFavourite';
import { Modal} from '@mui/material'

function Note ( {author, title, content, created_at, checked, color, id, notebookId, onDelete, isNew, isFavourite, hideDelete, hideCheck, onEdit} ) {

    const [check, setCheck] = useState(checked ?? false);
    const [fav, setFav] = useState(isFavourite ?? false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editContent, setEditContent] = useState(content);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleOpenDeleteModal = (e) => {
        e.stopPropagation();
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const handleOpenEditModal = (e) => {
        e.stopPropagation();
        setOpenEditModal(true);
        setEditContent(content);
        setIsEditing(false);
    }

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setIsEditing(false);
        setEditContent(content);
    };

    const handleSaveEdit = async () => {
        const response = await editNote(notebookId, id, title, editContent, check, color);
        if (response) {
            onEdit(response);
            handleCloseEditModal();
        }
        
    };

    const handleContentClick = () => {
        setIsEditing(true);
    };

    return (
        <>
            <button className={`note-container ${check ? 'note-checked' : ''} ${isNew ? 'note-enter' : ''}`} style={{backgroundColor:color}} onClick={handleOpenEditModal}>
                <div className='note-header'>
                    <h2>{title}</h2>
                    <div className='note-buttons'>
                        {!hideDelete && (
                            <button className={`delete-note-button`} onClick={handleOpenDeleteModal}>
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
            <Modal open={openDeleteModal} onClose={handleCloseDeleteModal} aria-labelledby="delete-modal-title" aria-describedby="delete-modal-description">
                <div className='modal-delete-note'>
                    <div className='note-modal-content'>
                        <div className='note-modal-header'>
                            <h3 id="delete-modal-title">Delete note?</h3>
                            <p id="delete-modal-description">This action cannot be undone. The note will be permanently deleted.</p>
                        </div>
                    </div>
                    <div className='note-modal-buttons'>
                        <button className='note-modal-cancel-button' onClick={handleCloseDeleteModal}>
                            Cancel
                        </button>
                        <button className='note-modal-delete-button' onClick={(e) => {
                            handleDeleteButton(e);
                            handleCloseDeleteModal();
                        }}>
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal open={openEditModal} onClose={handleCloseEditModal} aria-labelledby="edit-modal-title">
                <div className='modal-edit-note' style={{backgroundColor: color}}>
                    <div className='edit-modal-header'>
                        <h2 className='edit-modal-title'>{title}</h2>
                        <button className='edit-modal-close-button' onClick={handleCloseEditModal}>
                            <span className='material-icons'>close</span>
                        </button>
                    </div>
                    
                    <div className='edit-modal-content'>
                        {isEditing ? (
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className='edit-content-textarea'
                                placeholder="Write your note content here..."
                                autoFocus
                                onBlur={() => setIsEditing(false)}
                            />
                        ) : (
                            <div 
                                className='edit-content-display'
                                onClick={handleContentClick}
                            >
                                {editContent || 'Click to add content...'}
                            </div>
                        )}
                    </div>

                    <div className='edit-modal-footer'>
                        <div className='edit-modal-info'>
                            <span className='edit-modal-author'>{author}</span>
                            <span className='edit-modal-date'>{created_at}</span>
                        </div>
                        <div className='edit-modal-buttons'>
                            <button className='edit-modal-cancel-button' onClick={handleCloseEditModal}>
                                Cancel
                            </button>
                            <button className='edit-modal-save-button' onClick={handleSaveEdit}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    );
}

export default Note;