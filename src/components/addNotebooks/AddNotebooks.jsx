import { useState } from 'react';
import './AddNotebooks.css';

function AddNotebooks() {
    const [open, setOpen] = useState(false);


   return (
     <button className = "add-notebooks">
        <span className='material-icons'> add </span>
        <p>Add Notebook</p>

     </button>
   );
 }
export default AddNotebooks;