import React from 'react';
import Button from '../Button/Button';

import './Modal.scss';

export default ({ onInputChange, onCreateNewFolderClick, textValue, onCancelClick }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span>Create Folder</span>
                </div>
                <div className="modal-body">
                    <input type="text" value={textValue} onChange={onInputChange} />
                </div>
                <div className="modal-footer">
                    {textValue.trim().length > 0 ? <Button onButtonClick={onCreateNewFolderClick} buttonText={'Create'} /> : null}
                    <Button onButtonClick={onCancelClick} buttonText={'Cancel'} />
                </div>
            </div>
        </div>
    )
}