import React from 'react'
import { DeleteModal } from '../types'
import { FcInfo } from "react-icons/fc";


const BaseModal: React.FC<DeleteModal> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return


  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal-header'>
          <FcInfo size={32} />
          <div className="modal-header-container">
            <h2 className='modal-description'>Are you sure you want to delete this item?</h2>
            <p className='modal-description'>This action cannot be undone.</p>
          </div>
        </div>
        <div className='modal-actions'>
          <button onClick={onClose} className='modal-button cancel'>
            Cancel
          </button>
          <button onClick={onDelete} className='modal-button delete'>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default BaseModal
