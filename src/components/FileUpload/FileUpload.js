import React from 'react';

import Button from '../Button/Button';
import './FileUpload.scss';

export default ({ onFileUploadClick }) => {
    return (
        <div className="upload-btn-wrapper">
            <Button buttonText={'Upload a file'} />
            <input type="file" name="myfile" onClick={(event) => {
                event.target.value = null
            }} onChange={onFileUploadClick} />
        </div>
    )
}