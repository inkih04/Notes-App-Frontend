import { deleteNotebook } from '../../api/deleteNotebook';
import './Notebook.css';
import EditNotebook from '../editNotebook/EditNotebook';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../../api/refereshToken';
import { useState } from 'react';
import { Modal} from '@mui/material'


function Notebook({name, description, color, id, isShared, onDelete, onEdit}) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  
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

  const handleShare = (e) => {
    e.stopPropagation(); 
    e.stopPropagation();
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
              <button className='action-btn' onClick={handleShare} type='button' title="Share">
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
                      <p id="modal-description">This action cannot be undone. The notebook will be permanently deleted.</p>
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
    </>
  );
}

export default Notebook;