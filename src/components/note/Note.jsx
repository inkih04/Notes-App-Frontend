import { use } from 'react';
import './Note.css';
import { useState } from 'react';

function Note ( {author, title, content, created_at, checked, color, id} ) {
    const [check, setCheck] = useState(false);

    const toggleCheck = () => {
        setCheck(!check);
    };


    const handleCheckButton = () => {
        toggleCheck();
        //todo: ...
    };

    return (

        <button className='note-container' style={{backgroundColor:color}}>
            <div className='note-header'>
                <h2>{title}</h2>
                <button onClick={handleCheckButton}>
                    <span className='material-icons'>check</span>
                </button>
            </div>
            <div className='note-content'>
                <p>{content}</p>
                
            </div>
            <div className='note-footer'>
                <p>{author}</p>
            </div>

        </button>
    );
}

export default Note;