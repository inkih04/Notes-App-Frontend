import React from 'react';
import './notebook.css';

function Notebook({ onNotebookClick, onEdit, onDelete, onShare }) {
  const handleNotebookClick = () => {
    if (onNotebookClick) {
      onNotebookClick();
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Evita que se active el click del notebook
    if (onEdit) {
      onEdit();
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Evita que se active el click del notebook
    if (onDelete) {
      onDelete();
    }
  };

  const handleShare = (e) => {
    e.stopPropagation(); // Evita que se active el click del notebook
    if (onShare) {
      onShare();
    }
  };

  return (
    <button className="notebook" onClick={handleNotebookClick}>
      <div className='notebook-header'>
        <h2>Notebook Component</h2>
        <div className='notebook-actions'>
          <button className='action-btn' onClick={handleEdit} title="Editar">
            <span className='material-icons'>edit</span>
          </button>
          <button className='action-btn' onClick={handleDelete} title="Borrar">
            <span className='material-icons'>delete</span>
          </button>
          <button className='action-btn' onClick={handleShare} title="Compartir">
            <span className='material-icons'>share</span>
          </button>
        </div>
      </div>
      
      <p>This is where the notebook content will be displayed</p>
    </button>
  );
}

export default Notebook;