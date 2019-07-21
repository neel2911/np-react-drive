import React from 'react';
import './File.scss';

export default ({ name, thumbnailLink, iconLink, onFileClick, onFileDblClick }) => {
    return (
        <div className="card-item" onClick={onFileClick} onDoubleClick={onFileDblClick}>
            <div className="image-container">
                <img src={thumbnailLink} alt={name} />
            </div>
            <div className="data-container">
                <div className="icon">
                    <img src={iconLink} alt={name} />
                </div>
                <div className="text">
                    <span>{name}</span>
                </div>
            </div>
        </div>
    )
}