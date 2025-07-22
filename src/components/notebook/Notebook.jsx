import { deleteNotebook } from '../../api/deleteNotebook';
import './Notebook.css';
import EditNotebook from '../editNotebook/EditNotebook';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../../api/refereshToken';
import { useState } from 'react';
import { Modal} from '@mui/material'
import {shareNotebook} from '../../api/shareNotebook'


function Notebook({name, description, color, id, isShared, onDelete, onEdit, author}) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
   const [shareEmail, setShareEmail] = useState('');

  const handleOpenShareModal = (e) => {
        e.stopPropagation();
        setOpenShareModal(true);
  }

  const handleCloseShareModal = () => {
    setOpenShareModal(false);
    setShareEmail('');
  };
  
  const handleNotebookClick = () => {
    refreshToken();
    navigate(`/notebooks/${id}`)
  };

  const handleEdit = (editedNotebook) => {
      onEdit(editedNotebook);
  };

  const handleDelete = async(e) => {
    e.stopPropagation(); 
    const response = await deleteNotebook(id);
    if (response) {
      onDelete(id);
    }
    e.stopPropagation();
  };

  const handleShareSubmit = async(e) => {
    e.preventDefault();
    console.log(shareEmail);
    handleCloseShareModal();
    const response = await shareNotebook(id,shareEmail);
  };


    const handleOpenModal = (e) => {
        e.stopPropagation();
        setOpenModal(true);
    }

    const handleCloseModal = () => setOpenModal(false);

  return (
    <>
        <button style={{backgroundColor: color}} type='button' className="notebook" onClick={handleNotebookClick}>
          <div className='notebook-header'>
            <h2>{name}</h2>
            <div className='notebook-actions'>

              <EditNotebook 
              originalName = {name}
              originalDescription={description}
              originalColor = {color}
              onEdit = {handleEdit}
              id ={id}
              />

              <button className='action-btn'  onClick={handleOpenModal} type='button' title="Delete">
                <span className='material-icons'>delete</span>
              </button>
              <button className='action-btn' onClick={handleOpenShareModal} type='button' title="Share">
                <span className={`material-icons ${isShared ? 'shared-icon' : ''}`}> share</span>
              </button>
            </div>
          </div>
          <p>{description}</p>
        </button>
        <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
          <div className='modal-delete-note'>
              <div className='note-modal-content'>
                  <div className='note-modal-header'>
                      <h3 id="modal-title">Delete notebook?</h3>
                      <p id="modal-description">This action cannot be undone. The notebook will be permanently deleted. If you are not the author of the notebook, it will only be delete from your view.</p>
                  </div>
              </div>
              <div className='note-modal-buttons'>
                  <button className='note-modal-cancel-button' onClick={handleCloseModal}>
                      Cancel
                  </button>
                  <button className='note-modal-delete-button' onClick={(e) => {
                      handleDelete(e);
                      handleCloseModal();
                  }}>
                      Delete
                  </button>
              </div>
          </div>
      </Modal>
       <Modal open={openShareModal} onClose={handleCloseShareModal} aria-labelledby="share-modal-title" aria-describedby="share-modal-description">
          <div className='modal-delete-note'>
              <div className='note-modal-content'>
                  <div className='note-modal-header'>
                      <h3 id="share-modal-title">Share notebook</h3>
                      <p id="share-modal-description">Enter the email address of the person you want to share this notebook with.</p>
                  </div>
                  <form className='modal-share-note-form' onSubmit={handleShareSubmit}>
                      <input
                          className="share-email-input"
                          type="email"
                          value={shareEmail}
                          onChange={(e) => setShareEmail(e.target.value)}
                          placeholder="Enter email address"
                          required
                      />
                  </form>
              </div>
              <div className='note-modal-buttons'>
                  <button className='note-modal-cancel-button' onClick={handleCloseShareModal}>
                      Cancel
                  </button>
                  <button 
                      className={`note-modal-share-button ${!shareEmail.trim() ? 'disabled' : ''}`}
                      onClick={handleShareSubmit}
                      disabled={!shareEmail.trim()}
                  >
                      Share
                  </button>
              </div>
          </div>
        </Modal>
    </>
  );
}

export default Notebook;