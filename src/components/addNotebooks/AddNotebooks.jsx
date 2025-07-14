import { useModal } from '../../hooks/useModal';
import { Modal } from '@mui/material';
import { useState } from 'react';
import { createNotebook } from '../../api/createNotebook';
import './AddNotebooks.css';

function AddNotebooks({onNotebookCreated}) {
    const { isOpen, open, close } = useModal();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: '#FAF15B'
    });

    const colorOptions = [
        '#FAF15B', '#FFB3BA', '#BAFFC9', '#BAE1FF', 
        '#FFFFBA', '#FFDFBA', '#E0BBE4', '#C7CEEA'
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newNotebook = await createNotebook(formData.name, formData.description, formData.color);
            console.log('Notebook data:', formData);

            onNotebookCreated(newNotebook);

            setFormData({ name: '', description: '', color: '#FAF15B' });
            close();
        }
        catch(error) {
            close()
        }
    };

    const handleClose = () => {
        setFormData({ name: '', description: '', color: '#FAF15B' });
        close();
    };

    return (
        <>
            <button className="add-notebooks" onClick={open}>
                <span className='material-icons'> add </span>
                <p>Add</p>
                <p className='p-hidden'>Notebook</p>
            </button>

            <Modal open={isOpen} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                <div className="add-notebooks-modal">
                    <div className='add-notebook-modal-title'> 
                        <h1>New Notebook</h1>
                        <button className='material-icons simple-button' onClick={handleClose}>close</button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className='add-notebooks-modal-form'>
                        <div className='add-notebooks-modal-form-field'>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter notebook name"
                                required
                            />
                        </div>
                        
                        <div className='add-notebooks-modal-form-field'>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter notebook description (optional)"
                                rows="3"
                            />
                        </div>
                        
                        <div className='add-notebooks-modal-form-field'>
                            <label>Color</label>
                            <div className='color-picker-container'>
                                {colorOptions.map((color) => (
                                    <label key={color} className='color-option'>
                                        <input
                                            type="radio"
                                            name="color"
                                            value={color}
                                            checked={formData.color === color}
                                            onChange={handleInputChange}
                                        />
                                        <div 
                                            className='color-circle'
                                            style={{ backgroundColor: color }}
                                        ></div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        <div className='form-actions'>
                            <button type="submit" className='submit-btn'>
                                Create Notebook
                            </button>
                        </div>
                    </form>
                </div> 
            </Modal>
        </>
    );
}

export default AddNotebooks;