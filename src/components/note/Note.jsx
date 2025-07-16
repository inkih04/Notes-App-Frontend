import { use } from 'react';
import './Note.css';
import { useState } from 'react';

function Note ( {} ) {
    const [check, setCheck] = useState(false);

    const toggleCheck = () => {
        setCheck(!check);
    };


    const handleCheckButton = () => {
        toggleCheck();
        //todo: ...
    };

    return (

        <button className='note-container'>
            <div className='note-header'>
                <h2>Hacer la compra</h2>
                <button onClick={handleCheckButton}>
                    <span className='material-icons'>check</span>
                </button>
            </div>
            <div className='note-content'>
                <p>Comprar leche, pan, huevos, verduras y detergente antes de las 6 PM.</p>
                
            </div>
            <div className='note-footer'>
                <p>victor</p>
            </div>

        </button>
    );
}

export default Note;