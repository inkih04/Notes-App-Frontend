import { useModal } from '../../hooks/useModal';
import {Modal, Box} from '@mui/material';
import './AddNotebooks.css';

function AddNotebooks() {
    const { isOpen, open, close} = useModal();

  const style = {
      position: 'absolute',
      top: '45%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: 'none',
      borderRadius: 3, 
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)', 
      p: 4,
  };


   return (
    <>
      <button className = "add-notebooks" onClick={open}>
          <span className='material-icons'> add </span>
          <p>Add</p>
          <p className='p-hidden'>Notebook</p>
      </button>

      <Modal open ={isOpen} onClose={close} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={style}>
          Hola
         </Box> 
      </Modal>
    </>
   );
 }
export default AddNotebooks;