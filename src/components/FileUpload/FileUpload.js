import React from 'react';
import './FileUpload.scss';
import Button from '../Button/Button';

export default ({ onFileUploadClick }) => {
    return (
        <div className="upload-btn-wrapper">
            <Button buttonText={'Upload a file'} />
            <input type="file" name="myfile" onChange={onFileUploadClick} />
        </div>
    )
}