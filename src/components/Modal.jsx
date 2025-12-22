import { createPortal } from 'react-dom'


export function Modal({ title, content, show, onClose, onConfirm, confirmText = "conferma" }) {

    if (!show) return null;

    return createPortal(

        <div className="modal-overlay">
            <div className='modal'>
                <h2>{title}</h2>
                {content}
                <div className='modal-actions'>
                    <button onClick={onClose}>Annulla</button>
                    <button onClick={onConfirm}>Conferma</button>
                </div>
            </div>

        </div>,
        document.body

    )
}