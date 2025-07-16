import { deleteNotebook } from '../../api/deleteNotebook';
import './Notebook.css';
import EditNotebook from '../editNotebook/EditNotebook';
import { useNavigate } from 'react-router-dom';

function Notebook({name, description, color, id, isShared, onDelete, onEdit}) {
  const navigate = useNavigate();
  
  const handleNotebookClick = () => {
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

  return (
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

          <button className='action-btn'  onClick={handleDelete} type='button' title="Delete">
            <span className='material-icons'>delete</span>
          </button>
          <button className='action-btn' onClick={handleShare} type='button' title="Share">
            <span className={`material-icons ${isShared ? 'shared-icon' : ''}`}> share</span>
          </button>
        </div>
      </div>
      <p>{description}</p>
    </button>
  );
}

export default Notebook;