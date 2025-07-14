import React from 'react';
import './notebook.css';

function Notebook({name, description, color, id, isShared}) {
  
  const handleNotebookClick = () => {
    if (onNotebookClick) {

    }
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Evita que se active el click del notebook
    if (onEdit) {

    }
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Evita que se active el click del notebook
    if (onDelete) {

    }
  };

  const handleShare = (e) => {
    e.stopPropagation(); // Evita que se active el click del notebook
    if (onShare) {

    }
  };

  return (
    <button style={{backgroundColor: color}} className="notebook" onClick={handleNotebookClick}>
      <div className='notebook-header'>
        <h2>{name}</h2>
        <div className='notebook-actions'>
          <button className='action-btn' onClick={handleEdit} title="Edit">
            <span className='material-icons'>edit</span>
          </button>
          <button className='action-btn' onClick={handleDelete} title="Delete">
            <span className='material-icons'>delete</span>
          </button>
          <button className='action-btn' onClick={handleShare} title="Share">
            <span className={`material-icons ${isShared ? 'shared-icon' : ''}`}> share</span>
          </button>
        </div>
      </div>
      
      <p>{description}</p>
    </button>
  );
}

export default Notebook;